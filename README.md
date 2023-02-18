# Angular Server Side Rendering | Angular Universal

In this section...

- What is Angular SSR?
- Installing Angular SSR;
- Checking client/server platform;
- Transfer state in Angular SSR;


## What is it?

When we use `ssr` it means that our app will be rendered on the backend.

In a standard app:

```
<!doctype html>
<html lang="en">
<head></head›
<body>
	<app-root›</app-root›
</body>

</html>
```

we don't have anything inside the body but the `<app-root>` and then our app with the help of `js` builds the whole markup inside the client.

> What's wrong with this approach?

Main issue is our page won't be index by SEO (i.e. google)

### What's the difference between Dynamic SSR and Static Pre-rendering ?


Dynamic server-side rendering (SSR) and static pre-rendering are both techniques for improving the performance and SEO of web applications. Here's the difference:

1. **Dynamic server-side rendering (SSR)**: With dynamic SSR, the server generates the HTML for each page request. The server pulls data from a database or an API, and renders the page on the fly. This allows the content to be customized for each user or request, and can be useful for applications that require real-time updates. However, dynamic SSR can be slower than static pre-rendering, as the server has to generate the HTML each time a request is made.

2. **Static pre-rendering**: With static pre-rendering, the HTML for each page is generated at build time, before the application is deployed. The server doesn't have to do any work when a request comes in, because the HTML is already pre-rendered. This can make the site faster and more SEO-friendly, as the search engine can see all the content on the page without running any JavaScript. However, static pre-rendering is less flexible than dynamic SSR, as the content is fixed at build time and can't be changed in real-time.

In summary, dynamic SSR is best suited for applications that require real-time updates and dynamic content, while static pre-rendering is better for content-heavy websites or applications that don't require real-time updates.

## Installing SSR

```
ng add @nguniversal/express-engine@your version --clientProject some-amazing-project
```

Now if we look at the `pkg.json` will see some new stuff:


```
dependencies: {
	"@nguniversal/express-engine":"14.2.3",
}


scripts: {
	"dev:ssr":"ng run appName: serve-ssr"
	"serve:ssr": "node dist/appName/server/main.js"
	"build:ssr":"ng build && ng run appName : server"
	"prerender":"ng run appName :prerender"
}
```
#### Entry Point

also now we have not just `main.ts` but also `main.server.ts`. The latter is the entry point for the server, and simply exports our server module.

```
import "@angular/platform-server/init";
import { enableProdMode } from "@angular/core";
import { environment } from "./environments/environment";
if (environment.production) {
    enableProdMode;
}

export { AppServerModule } from "./app/app.server.module";

export { renderModule } from "@angular/platform-server";

```

The `main.ts` le is updated with the following function:

```
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));

```

>This is to make sure the Angular application is bootstrapped after the DOM is loaded. 

#### Modules:

let's take a look at `AppServerModule`:

```
import { ServerModule } from "@angular/platform-server";
import { AppModule } from "./app.module";
import { AppComponent } from "./app.component";
	
@NgModule({
    imports: [AppModule, ServerModule],
    bootstrap: [AppComponent],
})
	
export class AppServerModule {}
	
```
	
> It means on the **backend** side we are not using `app.module.ts`, but we are still using it as an import inside `AppServerModule` which it's coming from the angular platform server:	
	
```
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: "serverApp" }),
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
	
```
	
> The `AppModule` calls `BrowerModule.withServerTransition()` method which tells Angular we are using server side rendering and the view has to be swapped once the full framework is loaded.


- Finally the most important file generated is the `server.ts` (*express*) here's where the magic happens:

	```
	server.engine("html", ngExpressEngine({
		bootstrap: AppServeModule,
	}))
	```

Here our server will analyze our modules (`AppServeModule`) and create the markup for our app

### How can we start our app?

- **Dynamic** SSR: `npm run build:ssr && npm run serve:ssr`

	This will compile your application and spin up a Node Express server to serve your Universal application on http://localhost:4000

- **Static** Pre-Rendering: `npm run build:prerender && npm run serve:prerender`

	This script compiles your application and pre-renders your applications files, spinning up a demo http-server so you can view it on http://localhost:8080

> Note: To deploy your static site to a static hosting platform you will have to deploy the dist/browser folder, rather than the usual dist

In the `CLI` we should see: first starting our backend and then the frontend.

Everything will look the same but the source code:

```
// copy and paste html here
```

## Checking client / server platform

Some stuff exist only inside the browser such as: *localstorage* or the *window*, ect...

if we do something like this:

```
  isLoggedIn() {
        const token = localStorage.getItem('token') ? true : false;
        return token;
    }
```


we'll got this err: `localstorage is not defined`


> How can we fix this?

We can inject the platform:

```
constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private service: TodosService,
    private ts: TransferState,
    private router: Router
) {}
```

now we can check if we are inside the client and to do that we can

```
import { isPlatformBrowser } from '@angular/common;

isLoggedIn() {
    if ((isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('token') ? true : false;
        return token; 
    }
}

```



## How to reuse state?


Since we got the data already on our server, we want to prevent our app from making not necessary API calls.

> How can we do that?

1. We need to know if we are on the client/server side:

	```
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private service: TodosService,
        private ts: TransferState,
        private router: Router
    ) {}
	```

2. Because we want to save the state on the server side this time we import: `isPlatformServer`


	```
	import { isPlatformServer } from '@angular/common;
	
	constructor(private ts: TrasferState) {}
	
	    getDonuts() {
	        this.service.getAll
	        .subscribe((response: IDonut[]) => {
	            if (isPlatformServer(this.platformId)) {
	                // this.ts.set(key, value)
	                this.ts.set<IDonut[]>(makeStateKey('donuts), response)
	            }
	            this.donuts = response;
	        })
	    }
	```

3. Now we just need to check whether or not the data is already there:

	```
	ngOnInit() {
	    if (this.ts.hasKey(makeStateKey('donuts'))) {
	        this.donuts = this.ts.get(makeStateKey('donuts'), [])
	    } else {
	        getDonuts();
	    }
	}
	
	```
	

























