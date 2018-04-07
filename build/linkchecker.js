riot.tag2('linkchecker', '<form if="{showButton}" onsubmit="{submit}" style="margin-bottom: 20px;"> <button class="btn btn-default" type="submit" disabled="{disabled}">Check your website</button> </form> <div class="alert alert-{messageType}"> <raw content="{message}"></raw> </div> <ul class="nav nav-tabs" role="tablist"> <li role="presentation" class="active"><a href="#progressAndStats" aria-controls="progressAndStats" role="tab" data-toggle="tab">Progress and Stats</a></li> <li role="presentation"><a href="#links" aria-controls="links" role="tab" data-toggle="tab">Links</a></li> <li role="presentation"><a href="#images" aria-controls="images" role="tab" data-toggle="tab">Images</a></li> <li role="presentation"><a href="#youTubeVideos" aria-controls="youTubeVideos" role="tab" data-toggle="tab">YouTube Videos</a></li> <li role="presentation"><a href="#statusCodes" aria-controls="statusCodes" role="tab" data-toggle="tab">Common Status Codes</a></li> <li role="presentation"><a href="#unhandledResources" aria-controls="unhandledResources" role="tab" data-toggle="tab">Unhandled Resources</a></li> <li if="{enableScheduler}" role="presentation"><a href="#scheduler" aria-controls="scheduler" role="tab" data-toggle="tab">Scheduler</a></li> </ul> <div class="tab-content"> <div role="tabpanel" class="tab-pane active" id="progressAndStats"> <h3>Progress and Stats</h3> <div class="row"> <div class="col-lg-6"> <div class="panel panel-default"> <div class="panel-heading">Stats</div> <table class="table table-bordered"> <tr> <td>Number of crawled HTML pages on your site</td> <td class="text-right" style="width: 200px;">{urlsCrawledCount}</td> </tr> <tr> <td>Number of checked internal and external resources</td> <td class="text-right">{checkedLinksCount}</td> </tr> <tr if="{data.Stats}"> <td>Started at</td> <td class="text-right">{datetime(data.Stats.StartedAt)}</td> </tr> <tr if="{data.Stats}"> <td>Finished at</td> <td class="text-right">{datetime(data.Stats.FinishedAt)}</td> </tr> </table> </div> </div> <div if="{data.Stats}" class="col-lg-6"> <div class="panel panel-default"> <div class="panel-heading">Detailed Stats</div> <table class="table table-bordered"> <tr> <td>Number of valid links</td> <td class="text-right" style="width: 200px;">{data.Stats.ValidLinksCount}</td> </tr> <tr> <td>Number of dead links</td> <td class="text-right">{data.Stats.DeadLinksCount}</td> </tr> <tr> <td>Number of valid embedded YouTube videos</td> <td class="text-right">{data.Stats.ValidEmbeddedYouTubeVideosCount}</td> </tr> <tr> <td>Number of dead embedded YouTube videos</td> <td class="text-right">{data.Stats.DeadEmbeddedYouTubeVideosCount}</td> </tr> </table> </div> </div> <div if="{data.Stats}" class="col-lg-6"> <div class="panel panel-default"> <div class="panel-heading">Setting Stats</div> <table class="table table-bordered"> <tr> <td>Crawl delay</td> <td class="text-right" style="width: 200px;">{data.Stats.CrawlDelayInSeconds} seconds</td> </tr> <tr> <td>Concurrent fetchers</td> <td class="text-right">{data.Stats.MaxFetchers}</td> </tr> <tr> <td>URL limit</td> <td class="text-right">{data.Stats.URLLimit} URLs</td> </tr> <tr> <td>Limit reached</td> <td class="text-right">{bool2text(data.Stats.LimitReached)}</td> </tr> </table> </div> </div> </div> </div> <div role="tabpanel" class="tab-pane" id="links"> <h3>Broken Links</h3> <p>The table below shows all broken links. Please note that the fixed markers are just temporary and are reset with the next link check.</p> <datatable ref="brokenLinks" table-class="table-striped responsive-table" columns="{urlsWithBrokenLinksColumns}" data="{urlsWithBrokenLinks}" actions="{brokenLinksActions}" message="{resultsMessage}"> </datatable> </div> <div role="tabpanel" class="tab-pane" id="images"> <h3>Broken Images</h3> <p if="{!hasToken()}">Broken images are just checked in the <a href="https://www.marcobeierer.com/tools/link-checker-professional" target="_blank">professional version of the Link Checker</a>.</p> <p if="{hasToken()}">The table below shows all broken images. Please note that the fixed markers are just temporary and are reset for the next link check.</p> <datatable if="{hasToken()}" table-class="table-striped table-responsive" columns="{urlsWithDeadImagesColumns}" data="{urlsWithDeadImages}" actions="{brokenImagesActions}" message="{resultsMessage}"> </datatable> </div> <div role="tabpanel" class="tab-pane" id="youTubeVideos"> <h3>Broken Embedded YouTube Videos</h3> <p if="{!hasToken()}">Broken embedded YouTube videos are just checked in the <a href="https://www.marcobeierer.com/tools/link-checker-professional" target="_blank">professional version of the Link Checker</a>.</p> <p if="{hasToken()}">The table below shows all broken embedded YouYube videos. Please note that the fixed markers are just temporary and are reset for the next link check.</p> <datatable if="{hasToken()}" table-class="table-striped table-responsive" columns="{urlsWithDeadYouTubeVideosColumns}" data="{urlsWithDeadYouTubeVideos}" actions="{deadYouTubeVideosActions}" message="{resultsMessage}"> </datatable> </div> <div role="tabpanel" class="tab-pane" id="statusCodes"> <h3>Common Status Codes</h3> <div class="panel panel-default table-responsive"> <table class="table table-striped table-responsive"> <thead> <tr> <th style="width: 10em;">Status Code</th> <th style="width: 20em;">Status Text</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>502</td> <td>Bad Gateway</td> <td>The server returned an invalid response when the Link Checker tried to access the URL.</td> </tr> <tr> <td>504</td> <td>Gateway Timeout</td> <td>The Link Checker was not able to access the URL because it timed out.</td> </tr> </tbody> </table> </div> </div> <div role="tabpanel" class="tab-pane" id="unhandledResources"> <h3>Unhandled Resources (mainly blocked by robots.txt)</h3> <p>Websites can prohibit access for web crawlers like the one used by the Link Checker with the robots exclusion protocol (robots.txt file). The Link Checker does respect the robots exclusion protocol for the website it crawls, but not for external links because it does just access individual URLs of the external sites.</p> <p>However, some websites take some effort to restrict the access for crawlers and the Link Checker does respect that and does not try to bypass the restrictions. You can find all URLs the Link Checker was not able to access in the table below, so that you could check them manually. If you have done this, you could mark them as working. Each marker is saved for one month in your browsers cache and the date of the last marking is shown in the table below.</p> <p>If the blocked links were found on your website, you can add rules for the Link Checker to your robots.txt file and restart the Link Checker. Please see the <a href="https://www.marcobeierer.com/tools/link-checker-faq" target="_blank">FAQs</a> for further information.</p> <h4>Unhandled Links</h4> <datatable ref="linksBlockedByRobots" table-class="table-striped table-responsive" columns="{urlsWithLinksBlockedByRobotsColumns}" data="{urlsWithLinksBlockedByRobots}" actions="{blockedLinksActions}" message="{resultsMessage}"> </datatable> <virtual if="{hasToken()}"> <h4>Unhandled Images</h4> <datatable ref="unhandledEmbeddedResources" table-class="table-striped table-responsive" columns="{urlsWithLinksBlockedByRobotsColumns}" data="{urlsWithUnhandledEmbeddedResources}" actions="{blockedLinksActions}" message="{resultsMessage}"> </datatable> </virtual> <h4>Custom Status Codes</h4> <div class="panel panel-default table-responsive"> <table class="table table-striped table-responsive"> <thead> <tr> <th style="width: 10em;">Status Code</th> <th style="width: 20em;">Status Text</th> <th>Description</th> </tr> </thead> </tbody> <tr> <td>601</td> <td>Blocked by robots</td> <td>The Link Checker was not able to access the URL because the access was blocked by the robots exclusion protocol.</td> </tr> <tr> <td>602</td> <td>HTML parse error</td> <td>The HTML code of this page could not be parsed because of an error in the code or because the page was larger than 50 MB.</td> </tr> <tr> <td>603</td> <td>Unknown authority error</td> <td>This status code means that the certificate was signed by an unknown certificate authority. If accessing the page works in your web browser, probably the provided certificate chain is broken. Most, but not all, browsers can handle such situation and download the missing certificates on the fly. If the error was detected on you website, you should fix the origin of the issue and provid the whole chain to all clients.</td> </tr> </tbody> </table> </div> <p><em>Please note that it is possible in rare situations that a website returns these status codes and if this is the case, they probably have another meaning.</em></p> </div> <div if="{enableScheduler}" role="tabpanel" class="tab-pane" id="scheduler"> <h3>Scheduler</h3> <linkchecker-scheduler website-url="{websiteURL}" token="{token}" dev="{dev}"></linkchecker-scheduler> </div> </div>', '', '', function(opts) {
		var self = this;

		self.message = '';
		self.originSystem = opts.originSystem || 'riot';
		self.data = {};
		self.dev = opts.dev;
		self.enableScheduler = opts.enableScheduler || false;

		self.on('mount', function() {
			lscache.setBucket('linkchecker');
			lscache.flushExpired();

			self.data = lscache.get('data');
			if (self.data != null) {
				self.render(self.data);
				self.update();
			}
		});

		self.bool2text = function(val) {
			if (val) {
				return 'Yes';
			}
			return 'No';
		}

		self.datetime = function(val) {
			return new Date(val).toLocaleString();
		}

		self.hasToken = function() {
			return self.token || (self.data.Stats != undefined && self.data.Stats.TokenUsed);
		}

		self.urlsWithBrokenLinksColumns = [
			{
				label: 'URL where the broken links were found',
				width: '35%',
				callback: function(info, url) {
					return url;
				},
				linkCallback: function(info, url) {
					return url;
				},
			},
			{
				label: 'Broken Links',
				type: 'subtable',
				colspan: '3',
				callback: subtableCallback,
				message: 'No broken links left.',
			},
			{
				label: 'Status Code',
				width: '9em',
				showBody: false,
			},
			{
				label: 'Actions',
				width: '11em',
				showBody: false,
			}
		];

		self.urlsWithLinksBlockedByRobotsColumns = [
			{
				label: 'URL where the resources were found',
				width: '35%',
				callback: function(info, url) {
					return url;
				},
				linkCallback: function(info, url) {
					return url;
				},
			},
			{
				label: 'Blocked Resources',
				type: 'subtable',
				colspan: '4',
				callback: subtableBlockedLinksCallback,
			},
			{
				label: 'Status Code',
				width: '9em',
				showBody: false,
			},
			{
				label: 'Marked As Working On',
				width: '15em',
				showBody: false,
			},
			{
				label: 'Actions',
				width: '11em',
				showBody: false,
			}
		];

		self.urlsWithDeadImagesColumns = [
			{
				label: 'URL where the broken images were found',
				width: '35%',
				callback: function(info, url) {
					return url;
				},
				linkCallback: function(info, url) {
					return url;
				},
			},
			{
				label: 'Broken Images',
				type: 'subtable',
				colspan: '3',
				callback: subtableCallback,
				message: 'No broken images left.',
			},
			{
				label: 'Status Code',
				width: '9em',
				showBody: false,
			},
			{
				label: 'Actions',
				width: '11em',
				showBody: false,
			}
		];

		self.urlsWithDeadYouTubeVideosColumns = [
			{
				label: 'URL where the broken videos were found',
				width: '35%',
				callback: function(info, url) {
					return url;
				},
				linkCallback: function(info, url) {
					return url;
				},
			},
			{
				label: 'Broken Embedded Videos',
				type: 'subtable',
				colspan: '3',
				callback: subtableWithStatusTextCallback,
				message: 'No broken videos left.',
			},
			{
				label: 'Status Text',
				width: '25em',
				showBody: false,
			},
			{
				label: 'Actions',
				width: '11em',
				showBody: false,
			}
		];

		function subtableBlockedLinksCallback(info, url) {
			return [
				{
					label: 'URL',
					linkCallback: function(elem) {
						return elem.URL;
					},
				},
				{
					label: 'StatusCode',
					width: '9em',
				},
				{
					label: 'Marked As Working On',
					width: '15em',
					callback: function(elem) {
						var markedOn = lscache.get(elem.URL);
						if (markedOn == undefined) {
							return 'never';
						}

						return new Date(markedOn).toLocaleDateString();
					},
				},
				{
					label: 'Actions',
					width: '10em',
				}
			]
		}

		function subtableCallback(info, url) {
			return [
				{
					label: 'URL',
					linkCallback: function(elem) {
						return elem.URL;
					},
				},
				{
					label: 'StatusCode',
					width: '9em',
				},
				{
					label: 'Actions',
					width: '10em',
				}
			]
		}

		function subtableWithStatusTextCallback(info, url) {
			return [
				{
					label: 'URL',
					linkCallback: function(elem) {
						return elem.URL;
					},
				},
				{
					label: 'StatusText',
					width: '25em',
				},
				{
					label: 'Actions',
					width: '10em',
				}
			]
		}

		self.blockedLinksActions = [
			{
				labelCallback: function(elem) {
					if (wasAlreadyMarkedToday(elem)) {
						return 'Already marked';
					}
					return 'Mark as Working';
				},
				btnType: 'primary',
				action: 'callback',
				callback: function(elem) {
					lscache.set(elem.URL, Date.now(), 60 * 24 * 30);
					self.refs.linksBlockedByRobots.update();
				},
				isDisabledCallback: wasAlreadyMarkedToday
			}
		];

		function wasAlreadyMarkedToday(elem) {
			var markedOn = lscache.get(elem.URL);
			if (markedOn == undefined) {
				return false;
			}
			return new Date(Date.now()).toLocaleDateString() == new Date(markedOn).toLocaleDateString();
		}

		self.brokenImagesActions = [
			{
				label: 'Mark as Fixed',
				btnType: 'primary',
				action: 'callback',
				callback: function(elem) {
					markLinkInList(elem, self.urlsWithDeadImages);
				}
			}
		];

		self.deadYouTubeVideosActions = [
			{
				label: 'Mark as Fixed',
				btnType: 'primary',
				action: 'callback',
				callback: function(elem) {
					markLinkInList(elem, self.urlsWithDeadYouTubeVideos);
				}
			}
		];

		self.brokenLinksActions = [
			{
				label: 'Mark as Fixed',
				btnType: 'primary',
				action: 'callback',
				callback: function(elem) {
					markLinkInList(elem, self.urlsWithBrokenLinks);
				}
			}
		];

		function resetObject(obj) {
			Object.keys(obj).forEach(
				function(key) {
					delete obj[key];
				}
			);
		}

		function markLinkInList(elem, list) {
			delete list[elem.FoundOnURL][elem.URL];

			if (Object.keys(list[elem.FoundOnURL]).length == 0) {

			}
		}

		opts.linkchecker.on('start', function(websiteURL, token, maxFetchers) {
			self.websiteURL = websiteURL;
			self.setToken(token);
			self.maxFetchers = maxFetchers || self.maxFetchers;

			self.start();
		});

		opts.linkchecker.on('started', function() {
			self.disabled = true;
		});

		opts.linkchecker.on('stopped', function() {
			self.disabled = false;
			self.update();
		});

		this.setMessage = function(text, type) {
			self.message = text;
			self.messageType = type;
			self.update();
		}.bind(this)

		this.setToken = function(token) {
			self.token = token.replace(/\s/g, '');
		}.bind(this)

		var resultsMessage = 'Link check not started yet.';

		self.websiteURL = opts.websiteUrl || '';
		self.token = '';
		if (opts.token) {
			self.setToken(opts.token);
		}
		self.maxFetchers = opts.maxFetchers || 10;

		if (self.websiteURL != '') {
			self.showButton = true;
		}

		self.urlsCrawledCount = 0;
		self.checkedLinksCount = 0;

		self.setMessage('The Link Checker was not started yet.', 'info');
		self.resultsMessage = resultsMessage;

		self.urlsWithBrokenLinks = {};
		self.urlsWithLinksBlockedByRobots = {};
		self.urlsWithDeadImages = {};
		self.urlsWithDeadYouTubeVideos = {};
		self.urlsWithUnhandledEmbeddedResources = {};

		self.retries = 0;

		this.submit = function(e) {
			e.preventDefault();
			self.start();
		}.bind(this)

		this.start = function() {
			opts.linkchecker.trigger('started');

			lscache.remove('data');
			self.data = {};

			self.urlsCrawledCount = 0;
			self.checkedLinksCount = 0;

			resetObject(self.urlsWithBrokenLinks);
			resetObject(self.urlsWithLinksBlockedByRobots);
			resetObject(self.urlsWithDeadImages);
			resetObject(self.urlsWithDeadYouTubeVideos);
			resetObject(self.urlsWithUnhandledEmbeddedResources);

			self.setMessage('Your website is being checked. Please wait a moment. You can watch the progress in the stats below.', 'warning');
			self.resultsMessage = 'Please wait until the check has finished.';

			var url64 = window.btoa(encodeURIComponent(self.websiteURL).replace(/%([0-9A-F]{2})/g, function(match, p1) {
				return String.fromCharCode('0x' + p1);
			}));
			url64.replace(/\+/g, '-').replace(/\//g, '_');

			self.doRequest = function() {
				var tokenHeader = '';
				if (self.token != '') {
					tokenHeader = 'BEARER ' + self.token;
				}

				var url = 'https://api.marcobeierer.com/linkchecker/v1/' + url64 + '?origin_system=' + self.originSystem + '&max_fetchers=' + self.maxFetchers;
				if (self.dev == '1') {
					url = 'sample_data/current.json?_=' + Date.now();
				} else if (self.dev == '2') {
					url = 'http://marco-desktop:9999/linkchecker/v1/' + url64 + '?origin_system=' + self.originSystem + '&max_fetchers=' + self.maxFetchers;
				}

				jQuery.ajax({
					method: 'GET',
					url: url,
					headers: {
						'Authorization': tokenHeader,
					}
				}).done(function(data) {
					self.retries = 0;

					self.data = data;
					self.render(self.data);

					if (data.Finished) {
						opts.linkchecker.trigger('stopped');

						if (lscache.supported()) {
							lscache.set('data', data);
						}
					} else {
						setTimeout(self.doRequest, 1000);
					}
				}).fail(function(xhr) {
					opts.linkchecker.trigger('stopped');

					var statusCode = xhr.status;

					if (statusCode == 401) {
						self.setMessage("The validation of your token failed. The token is invalid or has expired. Please try it again or contact me if the token should be valid.", 'danger');
					}
					else if (statusCode == 500) {
						if (xhr.responseText == '') {
							self.setMessage("The check of your website failed. Please try it again.", 'danger');
						} else {
							self.setMessage("The check of your website failed with the error:<br/><strong>" + JSON.parse(xhr.responseText) + "</strong>.", 'danger');
						}
					}
					else if (statusCode == 503) {
						self.setMessage("The backend server is temporarily unavailable. Please try it again later.", 'danger');
					}
					else if (statusCode == 504 && xhr.getResponseHeader('X-CURL-Error') == 1) {
						var message = JSON.parse(xhr.responseText);
						if (message == '') {
							self.setMessage("A cURL error occurred. Please contact the developer of the extensions.", 'danger');
						} else {
							self.setMessage("A cURL error occurred with the error message:<br/><strong>" + message + "</strong>.", 'danger');
						}
					}
					else if (statusCode == 0 && self.retries < 3) {
						self.retries++;
						setTimeout(self.doRequest, 1000);
						return;
					}
					else {
						self.setMessage("The check of your website failed. Please try it again or contact the developer of the extensions.", 'danger');
					}

					self.resultsMessage = resultsMessage;
				}).always(function() {
					self.update();
				});
			};
			self.doRequest();
		}.bind(this)

		self.render = function(data) {
			self.urlsCrawledCount = data.URLsCrawledCount;
			self.checkedLinksCount = data.CheckedLinksCount;

			if (data.Finished) {
				if (data.LimitReached) {
					self.setMessage("The URL limit was reached. The Link Checker has not checked your complete website. You could buy a token for the <a href=\"https://www.marcobeierer.com/purchase\">Link Checker Professional</a> to check up to 50'000 URLs.", 'danger');
				} else {
					var message = "Your website has been checked successfully. Please see the result below.";

					if (data.Stats != undefined && !data.Stats.TokenUsed) {
						message += " If you additionally like to check your site for <strong>broken images</strong> or like to use the scheduler for an <strong>automatically triggered daily check</strong>, then have a look at the <a href=\"https://www.marcobeierer.com/purchase\">Link Checker Professional</a>.";
					}

					self.setMessage(message, 'success');
				}

				self.resultsMessage = 'Nothing is broken, everything seems to be fine.';

				if (!jQuery.isEmptyObject(data.DeadLinks)) {

					for (var url in data.DeadLinks) {
						self.urlsWithBrokenLinks[url] = {};

						data.DeadLinks[url].forEach(function(obj) {
							obj.FoundOnURL = url;
							self.urlsWithBrokenLinks[url][obj.URL] = obj;
						});

						if (Object.keys(self.urlsWithBrokenLinks[url]).length == 0) {
							delete self.urlsWithBrokenLinks[url];
						}
					}
				}

				if (!jQuery.isEmptyObject(data.UnhandledLinkedResources)) {
					for (var url in data.UnhandledLinkedResources) {
						self.urlsWithLinksBlockedByRobots[url] = {};

						data.UnhandledLinkedResources[url].forEach(function(obj) {
							obj.FoundOnURL = url;
							self.urlsWithLinksBlockedByRobots[url][obj.URL] = obj;
						});

						if (Object.keys(self.urlsWithLinksBlockedByRobots[url]).length == 0) {
							delete self.urlsWithLinksBlockedByRobots[url];
						}
					}
				}

				if (!jQuery.isEmptyObject(data.DeadEmbeddedImages)) {

					for (var url in data.DeadEmbeddedImages) {
						self.urlsWithDeadImages[url] = {};

						data.DeadEmbeddedImages[url].forEach(function(obj) {
							obj.FoundOnURL = url;
							self.urlsWithDeadImages[url][obj.URL] = obj;
						});

						if (Object.keys(self.urlsWithDeadImages[url]).length == 0) {
							delete self.urlsWithDeadImages[url];
						}
					}
				}

				if (!jQuery.isEmptyObject(data.DeadEmbeddedYouTubeVideos)) {

					for (var url in data.DeadEmbeddedYouTubeVideos) {
						self.urlsWithDeadYouTubeVideos[url] = {};

						data.DeadEmbeddedYouTubeVideos[url].forEach(function(obj) {
							obj.FoundOnURL = url;
							self.urlsWithDeadYouTubeVideos[url][obj.URL] = obj;
						});

						if (Object.keys(self.urlsWithDeadYouTubeVideos[url]).length == 0) {
							delete self.urlsWithDeadYouTubeVideos[url];
						}
					}
				}

				if (!jQuery.isEmptyObject(data.UnhandledEmbeddedResources)) {
					for (var url in data.UnhandledEmbeddedResources) {
						self.urlsWithUnhandledEmbeddedResources[url] = {};

						data.UnhandledEmbeddedResources[url].forEach(function(obj) {
							obj.FoundOnURL = url;
							self.urlsWithUnhandledEmbeddedResources[url][obj.URL] = obj;
						});

						if (Object.keys(self.urlsWithUnhandledEmbeddedResources[url]).length == 0) {
							delete self.urlsWithUnhandledEmbeddedResources[url];
						}
					}
				}
			}
		}
});
