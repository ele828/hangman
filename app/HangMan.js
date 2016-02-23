

const hangManTpl = `
<svg width="400" height="400">
	<g class="shelf">
		<!-- shelf -->
		<line x1="70" x2="500" y1="20" y2="20" stroke="black" fill="transparent" stroke-width="10" />
		<line x1="200" x2="200" y1="20" y2="40" stroke="black" fill="transparent" stroke-width="10" />
		<line x1="350" x2="350" y1="20" y2="395" stroke="black" fill="transparent" stroke-width="10" />
		<line x1="70" x2="500" y1="390" y2="390" stroke="black" fill="transparent" stroke-width="10" />
	</g>
	<g class="man">
		<!-- head -->
		<circle class="head" cx="200" cy="80" r="40" stroke="black" fill="transparent" stroke-width="5" />
		<!-- body -->
		<line class="body" x1="200" x2="200" y1="120" y2="200" stroke="black" fill="transparent" stroke-width="5" />
		<!-- hands -->
		<line class="left-hand" x1="200" x2="120" y1="160" y2="90" stroke="black" fill="transparent" stroke-width="5" />
		<line class="right-hand" x1="200" x2="280" y1="160" y2="90" stroke="black" fill="transparent" stroke-width="5" />
		<!-- legs -->
		<line class="left-leg" x1="200" x2="120" y1="200" y2="300" stroke="black" fill="transparent" stroke-width="5" />
		<line class="right-leg" x1="200" x2="280" y1="200" y2="300" stroke="black" fill="transparent" stroke-width="5" />
	</g>
</svg>`;

export default class HangMan {
	constructor(container) {
		this.parts = [];
		this.current = 0;
		// apend to dom
		container.innerHTML += hangManTpl;
		this.group = document.querySelector('.man');
		const childNodes = this.group.childNodes;
		for(let i = 0; i < childNodes.length; i++)
			if (childNodes[i].nodeType == 1)
				this.parts.push(childNodes[i]);
	}

	restart() {
		this.current = 0;
		// close all part
		this.parts.forEach(function(node) {
			node.style.opacity = 0;
			node.classList.remove('path');
		});
	}

	draw() {
		if (this.current >= 6) return;
		let curNode = this.parts[ this.current++ ];
		curNode.style.opacity = 1;
		curNode.classList.add('path');
	}
}
