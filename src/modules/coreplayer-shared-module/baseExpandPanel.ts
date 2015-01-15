/// <reference path="../../js/jquery.d.ts" />
/// <reference path="../../js/extensions.d.ts" />
import baseExtension = require("./baseExtension");
import shell = require("./shell");
import utils = require("../../utils");
import baseView = require("./baseView");

export class BaseExpandPanel extends baseView.BaseView {

    isExpanded: boolean = false;
    isFullyExpanded: boolean = false;
    isUnopened: boolean = true;

    $top: JQuery;
    $title: JQuery;
    $collapseButton: JQuery;
    $main: JQuery;
    $closed: JQuery;
    $expandButton: JQuery;
    $expandFullButton: JQuery;
    $closedTitle: JQuery;

    constructor($element: JQuery) {
        super($element, false, true);
    }

    create(): void {
        
        this.setConfig('shared');
        
        super.create();

        this.$top = utils.Utils.createDiv('top');
        this.$element.append(this.$top);

        this.$title = utils.Utils.createDiv('title');
        this.$top.append(this.$title);

        this.$expandFullButton = $('<a class="expandFullButton"></a>');
        this.$top.append(this.$expandFullButton);

        this.$collapseButton = utils.Utils.createDiv('collapseButton');
        this.$top.append(this.$collapseButton);

        this.$closed = utils.Utils.createDiv('closed');
        this.$element.append(this.$closed);

        this.$expandButton = $('<a class="expandButton"></a>');
        this.$closed.append(this.$expandButton);

        this.$closedTitle = $('<a class="title"></a>');
        this.$closed.append(this.$closedTitle);

        this.$main = utils.Utils.createDiv('main');
        this.$element.append(this.$main);

        this.$expandButton.onPressed(() => {
            this.toggle();
        });

        this.$expandFullButton.onPressed(() => {
            this.expandFull();
        });

        this.$closedTitle.onPressed(() => {
            this.toggle();
        });

        this.$title.onPressed(() => {
            this.toggle();
        });

        this.$collapseButton.onPressed(() => {
            if (this.isFullyExpanded){
                this.collapseFull();
            } else {
                this.toggle();
            }
        });

        this.$collapseButton.onPressed(() => {
            this.toggle();
        });

        this.$top.hide();
        this.$main.hide();
    }

    init(): void{
        super.init();
    }

    toggle(): void {

        // if collapsing, hide contents immediately.
        if (this.isExpanded) {
            this.$top.hide();
            this.$main.hide();
            this.$closed.show();
        }

        var targetWidth = this.getTargetWidth();
        var targetLeft = this.getTargetLeft();

        /*
        if (immediate) {
            this.$element.width(targetWidth);
            this.$element.css('left', targetLeft);
            this.toggled();
            return;
        }
        */

        this.$element.stop().animate(
            {
                width: targetWidth,
                left: targetLeft
            },
            this.options.panelAnimationDuration, () => {
                this.toggled();
            });
    }

    toggled(): void {
        this.toggleStart();

        this.isExpanded = !this.isExpanded;

        // if expanded show content when animation finished.
        if (this.isExpanded) {
            this.$closed.hide();
            this.$top.show();
            this.$main.show();
        }
        
        this.toggleFinish();

        this.isUnopened = false;
    }

    expandFull(): void {
        var targetWidth = this.getFullTargetWidth();
        var targetLeft = this.getFullTargetLeft();

        this.expandFullStart();

        this.$element.stop().animate(
            {
                width: targetWidth,
                left: targetLeft
            },
            this.options.panelAnimationDuration, () => {
                this.expandFullFinish();
            });
    }

    collapseFull(): void {
        var targetWidth = this.getTargetWidth();
        var targetLeft = this.getTargetLeft();

        this.collapseFullStart();

        this.$element.stop().animate(
            {
                width: targetWidth,
                left: targetLeft
            },
            this.options.panelAnimationDuration, () => {
                this.collapseFullFinish();
            });
    }

    getTargetWidth(): number{
        return 0;
    }

    getTargetLeft(): number {
        return 0;
    }

    getFullTargetWidth(): number{
        return 0;
    }

    getFullTargetLeft(): number{
        return 0;
    }

    toggleStart(): void {

    }

    toggleFinish(): void {

    }

    expandFullStart(): void {

    }

    expandFullFinish(): void {
        this.isFullyExpanded = true;
        this.$expandFullButton.hide();
        this.$collapseButton.focus();
    }

    collapseFullStart(): void {

    }

    collapseFullFinish(): void {
        this.isFullyExpanded = false;
        this.$expandFullButton.show();
    }

    resize(): void {
        super.resize();

        this.$main.height(this.$element.parent().height() - this.$top.outerHeight(true));
    }
}