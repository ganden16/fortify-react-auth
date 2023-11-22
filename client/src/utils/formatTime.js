import moment from "moment";

export default function formatTime(iso) {
	const iso8601Date = iso;
	const date = moment(iso8601Date);

	const now = moment(); // Tanggal saat ini
	const duration = moment.duration(now.diff(date));

	let timeAgo = '';

	if(duration.years() > 0) {
		timeAgo = `${duration.years()} years ago`;
	} else if(duration.months() > 0) {
		timeAgo = `${duration.months()} months ago`;
	} else if(duration.days() > 0) {
		timeAgo = `${duration.days()} days ago`;
	} else if(duration.hours() > 0) {
		timeAgo = `${duration.hours()} hours ago`;
	} else if(duration.minutes() > 0) {
		timeAgo = `${duration.minutes()} minutes ago`;
	} else {
		timeAgo = 'Baru saja';
	}

	return timeAgo
}
