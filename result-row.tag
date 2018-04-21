'use strict';

<result-row>
	<td if="{ resources.length > 0}" style="width: 35%;"><a href="{ url }" target="_blank">{ url }</a></td>
	<td if="{ resources.length > 0}" colspan="4">
		<div class="panel panel-default table-responsive" style="margin-bottom: 0;">
			<table class="table">
				<tbody>
					<tr each="{ resource in resources }" if="{ show(resource) }">
						<td>
							<a target="_blank" href="{ resource.URL }">{ resource.URL }</a> <span if="{ resource.IsRedirected }" class="badge">Redirected</span>
						</td>
						<td style="width: 9em;">{ resource.Type }</td>
						<td style="width: 9em;" title="{ resource.StatusText }">{ status(resource) }</td>
						<td style="width: 10em;">
							<button if="{ !resource.IsUnhandled && !resource.IsMarkedAsFixed }" class="btn btn-sm btn-primary" onclick="{ markAsFixed }">Mark as Fixed</button>
							<button if="{ !resource.IsUnhandled && resource.IsMarkedAsFixed }" class="btn btn-sm btn-primary" onclick="{ markAsFixed }" disabled="{ true }">Marked as Fixed</button>

							<button if="{ resource.IsUnhandled && !resource.IsMarkedAsWorking }" class="btn btn-sm btn-primary" onclick="{ markAsWorking }">Mark as Working</button>
							<button title="The resource was manually checked on { new Date(resource.IsMarkedAsWorking).toLocaleDateString() }. Click the button to update date of last check." disabled="{ checkedToday(resource) }" if="{ resource.IsUnhandled && resource.IsMarkedAsWorking }" class="btn btn-sm btn-primary" onclick="{ markAsWorking }">Checked: { checkedDateString(resource) }</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</td>

	<script>
		var self = this;

		self.url = opts.url || console.error('no url set');
		self.resources = opts.resources || console.error('no resources set');
		self.plugin = opts.plugin || console.error('no plugin set');

		self.on('mount', function() {
		});

		self.show = function(resource) {
			return self.parent.showResource(resource);
		}

		self.checkedDateString = function(resource) {
			if (self.checkedToday(resource)) {
				return 'Today';
			}
			return new Date(resource.IsMarkedAsWorking).toLocaleDateString();
		}

		self.checkedToday = function(resource) {
			return new Date(Date.now()).toLocaleDateString() == new Date(resource.IsMarkedAsWorking).toLocaleDateString();
		}

		self.markAsFixed = function(e) {
			e.item.resource.IsMarkedAsFixed = true;

			var key = self.parent.keyForResource(self.url, e.item.resource.URL, e.item.resource.Type);

			lscache.setBucket('linkchecker-fixed-');
			lscache.set(key, true);

			self.parent.update();
		};

		self.markAsWorking = function(e) {
			var datex = Date.now();
			self.parent.setMarkedAsWorking(e.item.resource.URL, datex);
			self.parent.update();
		};

		self.status = function(resource) {
			if (resource.StatusCode > 0) {
				return resource.StatusCode;
			}
			return resource.StatusText;
		};
	</script>
</result-row>