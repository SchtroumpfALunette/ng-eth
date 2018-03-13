import { Component, OnInit, Input, ElementRef, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { CommentStmt } from '@angular/compiler';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'eth-identicon',
  template: '',
  styles: [`
  :host {
	  display: block;
      width: 64px;
      height: 64px;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 50%;
      box-shadow: inset rgba(255, 255, 255, 0.6) 0 2px 2px, inset rgba(0, 0, 0, 0.3) 0 -2px 6px;
  }
  `]
})
export class EthIdenticonComponent {

  @Input()
  set address(address: string) {
    console.log('address', address);
    if (!address) { return; }
    this.draw(address);
  };

  constructor(private ref: ElementRef, private renderer: Renderer2) { }

  private draw(address: string) {
	const url = blocky().create({seed: address}).toDataURL();
    this.renderer.setStyle(this.ref.nativeElement, 'backgroundImage', `url(${url})`);
  }

}

interface blockiesData {
	seed?: string;
	size?: number;
	scale?: number;
	color?: string;
	bgcolor?: string;
	spotcolor?: string;
}

const blocky = () => {
	// The random number is a js implementation of the Xorshift PRNG
	const randseed = new Array(4); // Xorshift: [x, y, z, w] 32 bit values

	const seedrand = (seed: string) => {
		for (var i = 0; i < randseed.length; i++) {
			randseed[i] = 0;
		}
		for (var i = 0; i < seed.length; i++) {
			randseed[i%4] = ((randseed[i%4] << 5) - randseed[i%4]) + seed.charCodeAt(i);
		}
	}

	const rand = () => {
		// based on Java's String.hashCode(), expanded to 4 32bit values
		var t = randseed[0] ^ (randseed[0] << 11);

		randseed[0] = randseed[1];
		randseed[1] = randseed[2];
		randseed[2] = randseed[3];
		randseed[3] = (randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8));

		return (randseed[3]>>>0) / ((1 << 31)>>>0);
	}

	const createColor = (): string => {
		//saturation is the whole color spectrum
		const h = Math.floor(rand() * 360);
		//saturation goes from 40 to 100, it avoids greyish colors
		const s = ((rand() * 60) + 40) + '%';
		//lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
		const l = ((rand()+rand()+rand()+rand()) * 25) + '%';

		return 'hsl(' + h + ',' + s + ',' + l + ')';
	}

	const createImageData = (size: number): number[] => {
		const width = size;
		const height = size;

		const dataWidth = Math.ceil(width / 2);
		const mirrorWidth = width - dataWidth;

		const data: number[] = [];
		for(let y = 0; y < height; y++) {
			let row = [];
			for(let x = 0; x < dataWidth; x++) {
				// this makes foreground and background color to have a 43% (1/2.3) probability
				// spot color has 13% chance
				row[x] = Math.floor(rand()*2.3);
			}
			var r = row.slice(0, mirrorWidth);
			r.reverse();
			row = row.concat(r);

			for(var i = 0; i < row.length; i++) {
				data.push(row[i]);
			}
		}

		return data;
	}

	const buildOpts = (opts: blockiesData): blockiesData => {
		const newOpts: blockiesData = {};

		newOpts.seed = opts.seed || Math.floor((Math.random()*Math.pow(10,16))).toString(16);

		seedrand(newOpts.seed);

		newOpts.size = opts.size || 8;
		newOpts.scale = opts.scale || 4;
		newOpts.color = opts.color || createColor();
		newOpts.bgcolor = opts.bgcolor || createColor();
		newOpts.spotcolor = opts.spotcolor || createColor();

		return newOpts;
	}

	const renderIcon = (opts: blockiesData, canvas: HTMLCanvasElement): HTMLCanvasElement => {
		const imageData = createImageData(opts.size);
		const width = Math.sqrt(imageData.length);

		canvas.width = canvas.height = opts.size * opts.scale;

		const cc = canvas.getContext('2d');
		cc.fillStyle = opts.bgcolor;
		cc.fillRect(0, 0, canvas.width, canvas.height);
		cc.fillStyle = opts.color;

		for(var i = 0; i < imageData.length; i++) {

			// if data is 0, leave the background
			if(imageData[i]) {
				var row = Math.floor(i / width);
				var col = i % width;

				// if data is 2, choose spot color, if 1 choose foreground
				cc.fillStyle = (imageData[i] == 1) ? opts.color : opts.spotcolor;

				cc.fillRect(col * opts.scale, row * opts.scale, opts.scale, opts.scale);
			}
		}
		return canvas;
	}

	const createIcon = (opts: blockiesData): HTMLCanvasElement => {
		const newOpts = buildOpts(opts || {});
		const canvas = document.createElement('canvas');

		renderIcon(newOpts, canvas);
		return canvas;
	}

	return {
		create: createIcon,
		render: renderIcon
	};
};

