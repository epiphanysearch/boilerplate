import $ from 'jquery';

const Main = class {
    constructor(el) {
        this.el = $(el).get(0);
        this.$el = $(this.el);

        this._init_ui();
        this._init_events();
    }

    _init_ui() {
        this.$header = this.$el.find('header');
    }

    _init_events() {
        this.$el.on('click', 'h1, h2, h3, h4, h5, h6', this.on_element_click.bind(this));
    }

    on_element_click(e) {
        $(e.currentTarget).css('color', 'red');
    }
};

export default Main;
