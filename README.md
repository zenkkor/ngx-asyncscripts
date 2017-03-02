# ngx-asyncscripts
Lazy loading scripts in an Angular 2 lazy loaded module? No probs!  


# How to install?  

`$ npm install ngx-asyncscripts`   

**Import the Service**   

```
import { NgXAsyncScripts } from 'ngx-asyncscripts';
```    

**Use in your component**  
*For the second parameter of your dependencies array, you can use css or js*
*Provide any additional attributes in the third parameter as an object*

```
export class AppComponent {


	constructor(private asnycScriptsService: NgXAsyncScripts)
	{

		/**
		 * Loads all the dependencies before proceeding
		 * @type {Array<Array<string | string | any>>}
		 */
		let dependencies = [
			["<DEPENDENCY_URL", "js"],
			["<DEPENDENCY_URL", "css"],
			["<DEPENDENCY_URL", "js", {"data-cfasync": "false"}],
		]

		/**
		 * Load services and return a promise.
		 * Do stuff after promise resolves
		 */
		asnycScriptsService.loadExternalDependencies(dependencies).then(
			function(success){
				console.log(success);
			}, function(error){
				console.log(error);
		});
	}
}
```    
