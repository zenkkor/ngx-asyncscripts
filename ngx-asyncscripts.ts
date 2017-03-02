import { Injectable } from '@angular/core';

@Injectable()
export class NgXAsyncScripts {

	constructor() {}

	/**
	 * Loads Provided scripts async for lazy loaded modules.
	 *
	 * @param  {Array<Array<string | string | any>>} externals array of links [["https://link", "css"], ["https://link", "js"]]
	 * @return {[type]}                 [description]
	 */
	loadExternalDependencies(externals: Array<Array<string | string | any>>): Promise<any> {

		return new Promise((resolveMain, rejectMain) => {

			let promises = [];

			for (let externalScript of externals) {

				let promise = new Promise((resolve, reject) => {

					let externalSrc  = externalScript[0];
					let type = externalScript[1];

					let extraAttributes = {};
					if (typeof externalScript[2] != "undefined") {
						extraAttributes = externalScript[2];
					}

					switch(type)
					{
						case 'js':
						{
							const script = document.createElement('script');
							script.async = true;
							script.src = externalSrc;

							for (let key in extraAttributes) {
							    let value = extraAttributes[key];
								script.setAttribute(key, value);
							}

							// Resolve promises event listener
							script.addEventListener('load', resolve);
							script.addEventListener('error', () => reject('Error loading script.'));
							script.addEventListener('abort', () => reject('Script loading aborted.'));

							document.head.appendChild(script);

							break;
						}
						case 'css':
						{
							var link = document.createElement('link');
							link.setAttribute('rel', 'stylesheet');
							link.setAttribute('type', 'text/css');
							link.setAttribute('href', externalSrc);

							for (let key in extraAttributes) {
							    let value = extraAttributes[key];
								link.setAttribute(key, value);
							}

							// Resolve promises event listener
							link.addEventListener('load', resolve);
							link.addEventListener('error', () => reject('Error loading script.'));
							link.addEventListener('abort', () => reject('Script loading aborted.'));

							document.getElementsByTagName('head')[0].appendChild(link)

							break;
						}
					}

				});

				promises.push(promise);

			}

			Promise.all(promises)
				.then(function(success) {
					resolveMain("Loaded all scripts")
				})
				.then(function(error) {
					rejectMain(error)
				}
			);

		});

	}

}
