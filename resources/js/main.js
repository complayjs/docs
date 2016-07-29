import ApplicationFacade from 'complay/lib/application-facade';
import ApplicationDomComponent from 'complay/lib/application-dom-component';

// components
import BackgroundArt from './components/background-art/background-art';
import Test from './components/test';


class Application extends ApplicationFacade {}

const app = new Application({
    observe: true,
    AppComponent: ApplicationDomComponent
});

app.immediate(() => {

});

app.onDomReady(() => {
    app.start({
        component: BackgroundArt,
        options: {
            autostart: true
        }
    });

    app.start({
        component: Test,
        options: {
            autostart: true,
            el: document.querySelector('.js-test')
        }
    });
});