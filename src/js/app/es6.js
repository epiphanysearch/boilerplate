import $ from 'jquery';

const Test = class {
    constructor(value) {
        this.value = value;
    }

    alert() {
        alert(this.value);
    }
};

export default Test;
