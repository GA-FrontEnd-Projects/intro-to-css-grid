$(function() {
	var timeoutId;

	function setStyles($section, itemType, property, value) {
		$section.find('.grid-' + itemType).css(property, value);
	}

	function initStyles() {
		var $sections = $('section');

		$sections.each(function() {
			var $section = $(this);
			var $properties = $section.find('[data-property]');
			
			$properties.each(function() {
				var $propertyContainer = $(this);
				var affectedItemType = $propertyContainer.attr('data-applies-to');
				var affectedProperty = $propertyContainer.attr('data-property');
				var affectedPropertyValue = $propertyContainer.val();

				setStyles($section, affectedItemType, affectedProperty, affectedPropertyValue);
			});
		});
	}

	initStyles();

	$('textarea')
		.keyup(function() {
			clearTimeout(timeoutId);

			var $this = $(this);
			var affectedItemType = $this.attr('data-applies-to');
			var affectedProperty = $this.attr('data-property');
			var affectedPropertyValue = $this.val();

			timeoutId = setTimeout(
				function() {
					setStyles($this.closest('section'), affectedItemType, affectedProperty, affectedPropertyValue);
				}, 350
			);
		})
		.blur(function(){
			clearTimeout(timeoutId);
			
			var $this = $(this);
			var affectedItemType = $this.attr('data-applies-to');
			var affectedProperty = $this.attr('data-property');
			var affectedPropertyValue = $this.val();

			setStyles($this.closest('section'), affectedItemType, affectedProperty, affectedPropertyValue);
		})

});