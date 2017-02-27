import { Injectable } from '@angular/core';

@Injectable()
export class NgXAsyncScripts {

	constructor() {}

	/**
	 * Loads Provided scripts async for lazy loaded modules.
	 * 
	 * @param  {Array<Array<string | string>>} externals array of links [["https://link", "css"], ["https://link", "js"]]
	 * @return {[type]}                 [description]
	 */
	loadServices(externals: Array<Array<string | string>>): Promise<any> {

		return new Promise((resolveMain, rejectMain) => {

			let promises = [];

			for (let externalScript of externals) {

				let promise = new Promise((resolve, reject) => {

					let externalSrc  = externalScript[0];
					let type = externalScript[1];

					switch(type)
					{
						case 'js':
						{
							const script = document.createElement('script');
							script.async = true;
							script.src = externalSrc;

							// Resolve promises event listener
							script.addEventListener('load', resolve);
							script.addEventListener('error', () => reject('Error loading script.'));
							script.addEventListener('abort', () => reject('Script loading aborted.'));

							document.head.appendChild(script);

							break;
						}
						case 'css':
						{
							var link = document.createElement('link')
							link.setAttribute('rel', 'stylesheet')
							link.setAttribute('type', 'text/css')
							link.setAttribute('href', externalSrc)

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
