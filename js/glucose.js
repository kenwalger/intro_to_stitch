// Update "glucose-XXXXX" with your Stitich App Id
const client = new stitch.StitchClient('glucose-XXXXX');
const db = client.service('mongodb', 'mongodb-atlas').db('glucose');

function displayCommentsOnLoad() {
	client.login().then(displayComments);
}

function displayComments() {
	db.collection('results').find({}).then(docs => {
		const html = docs.map(c => "<div>" + c.comment + "</div>").join("");
		document.getElementById("comments").innerHTML = html;
	});
}

function addComment() {
	const foo = document.getElementById("new_comment");
	db.collection("results").insert({owner_id : client.authedId(), comment: foo.value}).then(displayComments);
	foo.value = "";
}