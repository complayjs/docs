import ApplicationFacade from 'complay/lib/application-facade';
import ApplicationDomComponent from 'complay/lib/application-dom-component';

class Application extends ApplicationFacade {}

const app = new Application({
    observe: true,
    AppComponent: ApplicationDomComponent
});

app.immediate(() => {

});

app.onDomReady(() => {

});