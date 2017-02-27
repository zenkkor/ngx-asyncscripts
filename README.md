# ngx-asyncscripts
Lazy load scripts in a Angular 2 lazy loaded module? No probs!  


# How to install?  

`$ npm install ngx-asyncscripts`   

1. Import the Service  
```
import { NgXAsyncScripts } from 'ngx-asyncscripts';
```  

2. Use in your component  

```
export class AppComponent {


	constructor(private asyncLoaderService: NgXAsyncScripts)
	{

		/**
		 * Loads all the dependencies before proceeding
		 * @type {Array}
		 */
		let dependencies = [
			["//cdn.jsdelivr.net/medium-editor/latest/js/medium-editor.min.js", "js"],
			["//cdn.jsdelivr.net/medium-editor/latest/css/medium-editor.min.css", "css"],
		]

		/**
		 * Load services and return a promise.
		 * Do stuff after promise resolves
		 */
		asyncLoaderService.loadServices(dependencies).then(
			function(success){
				console.log(success);
			}, function(error){
				console.log(error);
		});
	}
}
```    
