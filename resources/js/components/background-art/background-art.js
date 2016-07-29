import Component from 'complay/lib/component';

class BackgroundArt extends Component {

    initialize() {
        console.log(`${this}.initialize()`, this.options.app);
    }
}

export default BackgroundArt;