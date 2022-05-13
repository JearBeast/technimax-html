function g(selector) {
	var self = {};

	//var matches = selector.match('/#(.*)/');
	self.selector = selector;

	if (selector === document) {
		self.element = selector;
	} else {
		self.element = document.querySelectorAll(self.selector);
	}

	self.children = self.element.children;
	self.style = self.element.style;
	self._startX = 0;
	self._offsetX = 0;
	self._dragElement = document.getElementById(selector + '-drag');
	self._dragContent = (self._dragElement !== null ? self._dragElement.parentNode : null);
	self._oldIndex = 0;
	self._widthElement = 0;
	self._parentElement = null;
	self._widthParent = 0;
	self._inputElement = document.getElementById(selector);
	self.min = 0;
	self.max = 100;
	self._max = 0;
	self._left = 0;
	self.posibleLeft = 0;

	self._parentElement = (self._dragElement !== null ? self._dragElement.parentNode : null);
	self._widthParent = (self._parentElement !== null ? window.getComputedStyle(self._parentElement).width : 0);
	self._widthElement = (self._dragElement !== null ? window.getComputedStyle(self._dragElement).width : 0);
	self._max = parseInt(self._widthParent) - parseInt(self._widthElement);
	self._step = self._max / self.max;

	self.getStep = function () {
		return self._step;
	};

	self.children = function () {
		return self.children;
	};

	self.on = function (name, callback) {
		var els = self.element;

		for (var i = 0; i < els.length; i++) {
			if (els[i].addEventListener) {
				els[i].addEventListener(name, callback, false);
			} else if (els[i].attachEvent) {
				els[i].attachEvent('on' + name, callback);
			}
		}

	};

	self.slider = function (min, max) {
		if (min != null) {
			self.min = min;
			self._min = min;
		}

		if (max != null) {
			self.max = max;
			self._max = max;
		}

		if (self._inputElement !== null) {
			self.InitDragDrop();
		}

		return self;
	};

	self.InitDragDrop = function () {
		self._dragElement.addEventListener('mousedown', self.OnMouseDown, false);
		self._dragElement.addEventListener('mouseup', self.OnMouseUp, false);
		self._dragElement.parentNode.parentNode.addEventListener('mouseleave', self.OnMouseUp, false);
		self._dragElement.parentNode.parentNode.addEventListener('mouseup', self.OnMouseUp, false);
		document.getElementsByTagName('body')[0].addEventListener('mouseleave', self.OnMouseUp, false);
		self._dragContent.addEventListener('mousedown', self.OnMouseClick, false);

		self.ChangeSlider(self._inputElement.value * self._step);
	};

	self.OnMouseClick = function (e) {
		if (e == null) {
			e = window.event;
		}
		var target = e.target != null ? e.target : e.srcElement;

		var targetParent = target;

		target = target.children[0];

		if (e.type == 'mousedown' && targetParent == self._parentElement) {
			self._dragElement = target;

			target.style.zIndex = 1000;
			self._dragElement = target;
			self._widthParent = window.getComputedStyle(targetParent).width;
			self._parentElement = targetParent;
			self._widthParent = window.getComputedStyle(targetParent).width;

			var bodyRect = document.body.getBoundingClientRect(),
				elemRect = targetParent.getBoundingClientRect(),
				offset = elemRect.left - bodyRect.left;

			self._startX = offset;
			self._left = e.clientX - offset;

			self.ChangeSlider(self._left);

			self._dragElement.style.zIndex = self._oldIndex;
			document.onmousemove = null;
			document.onselectstart = null;
			self._dragElement.ondragstart = null;
			self._dragElement = null;
		}

	};

	self.OnMouseDown = function (e) {
		if (e == null) {
			e = window.event;
		}
		var target = e.target != null ? e.target : e.srcElement;
		var clicked = false;

		if (target == self._dragContent) {
			clicked = true;
			target = target.children[0];
		}

		if ((e.button == 1 && window.event != null || e.button == 0) && target.className == 'drag') {
			self._startX = e.clientX;
			self._offsetX = self.ExtractNumber(target.style.left);
			self._oldIndex = target.style.zIndex;

			target.style.zIndex = 1000;
			self._dragElement = target;
			self._widthParent = window.getComputedStyle(self._dragElement).width;
			self._parentElement = self._dragElement.parentNode;
			self._widthParent = window.getComputedStyle(self._parentElement).width;

			document.onmousemove = self.OnMouseMove;
			target.ondragstart = function () {
				return false;
			}
			return false;
		}
	};


	self.OnMouseMove = function (e) {
		if (e == null) {
			var e = window.event;
		}
		self._left = (self._offsetX + e.clientX - self._startX);
		self.ChangeSlider(self._left);
	};

	self.ChangeSlider = function (value) {
		self._left = value;
		self._max = parseInt(self._widthParent) - parseInt(self._widthElement);
		var posibleLeft = self._left > 0 ? self._left < self._max ? self._left : self._max : 0;

		self._step = self._max / self.max;
		self._inputElement.value = Math.round(posibleLeft / self._step) + '%';
		self._inputElement.setAttribute('value', self._inputElement.value);
		self._inputElement.dispatchEvent(new Event('change'));
		self._dragElement.style.left = posibleLeft + 'px';
	};

	self.OnMouseUp = function (e) {

		if (self._dragElement != null) {
			self._dragElement.style.zIndex = self._oldIndex;
			document.onmousemove = null;
			document.onselectstart = null;
			self._dragElement.ondragstart = null;
			self._dragElement = null;
		}
	};

	self.ExtractNumber = function (value) {
		var n = parseInt(value);
		return n == null || isNaN(n) ? 0 : n;
	};

	return self;
}
