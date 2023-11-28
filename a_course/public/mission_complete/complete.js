window.onload = function () {
	//sessionStorage���� ������ ����
	const currentItem = JSON.parse(sessionStorage.getItem("currentItem"));

	if (currentItem) {
		document.getElementById("description").dataset.fullDescription =
			JSON.stringify(currentItem.complete_description);
		document.getElementById("image").dataset.fullDescription = JSON.stringify(
			currentItem.complete_imageUrl
		);
		document.getElementById("descrip_nametag").dataset.fullDescription =
			JSON.stringify(currentItem.complete_name);
		document.getElementById("descrip_nametag").textContent =
			currentItem.complete_name[0];
		document.getElementById("image").src = currentItem.complete_imageUrl[0];

		//descriptionBtn�� �ʱ� ���� ����
		const descriptionBtn = document.getElementById("descriptionBtn");
		//previousdescriptionBtn�� �ʱ� ���� ����
		const previousDescriptionBtn = document.getElementById(
			"previousDescriptionBtn"
		);
		previousDescriptionBtn.style.visibility = "hidden";
		descriptionBtn.style.visibility = "visible";

		//���� ������� �г����� ��������
		const userNickname = sessionStorage.getItem("userNickname");

		//@�� ������� �г������� �����Ͽ� ���
		let currentSentence = currentItem.complete_description[0]
			.trim()
			.replace("@", userNickname);

		//Typed.js�� Ÿ���� ȿ��
		if (
			document.querySelector("#description").textContent.trim() !==
			currentSentence
		) {
			typed = new Typed(document.querySelector("#description"), {
				strings: [currentSentence],
				typeSpeed: 25,
				showCursor: false,
				backDelay: 0,
			});
		}
	} else {
		console.error("������ ������ ������ �� �����ϴ�.");
	}
};

let currentIndex = 0;
let typed;
const descriptionBtn = document.getElementById("descriptionBtn");
const pictures = document.getElementById("image");
const previousDescriptionBtn = document.getElementById(
	"previousDescriptionBtn"
);

document.getElementById("next").addEventListener("click", function () {
	window.location.href = "/practice";
});

//��ư ���� update
function updateButtonState() {
	let sentences = JSON.parse(
		document.getElementById("description").dataset.fullDescription || "[]"
	);

	if (currentIndex == 0) {
		previousDescriptionBtn.style.visibility = "hidden";
		descriptionBtn.style.visibility = "visible";
	} else if (currentIndex == sentences.length - 1) {
		previousDescriptionBtn.style.visibility = "visible";
		descriptionBtn.style.visibility = "hidden";
		document.getElementById('next').classList.add("scaleAnimation");
	} else {
		previousDescriptionBtn.style.visibility = "visible";
		descriptionBtn.style.visibility = "visible";
	}
}

//��ư�� ������ �� ���, �̹���,��ư ���� ���� update������
function updateDescriptionAndButtons() {
	let sentences = JSON.parse(
		document.getElementById("description").dataset.fullDescription || "[]"
	);
	let imageUrls = JSON.parse(
		document.getElementById("image").dataset.fullDescription || "[]"
	);
	let names = JSON.parse(
		document.getElementById("descrip_nametag").dataset.fullDescription || "[]"
	);
	if (typed) {
		typed.destroy();
	}

	let currentImageUrl = imageUrls[currentIndex];
	if (currentImageUrl) {
		pictures.src = currentImageUrl;
	}
	document.getElementById("descrip_nametag").textContent = names[currentIndex];

	//���� ������� �г����� ��������
	const userNickname = sessionStorage.getItem("userNickname");

	//@�� ������� �г������� �����Ͽ� ���
	let currentSentence = sentences[currentIndex]
		.trim()
		.replace("@", userNickname);

	//Typed.js�� Ÿ���� ȿ��
	if (
		document.querySelector("#description").textContent.trim() !==
		currentSentence
	) {
		typed = new Typed(document.querySelector("#description"), {
			strings: [currentSentence],
			typeSpeed: 25,
			showCursor: false,
			backDelay: 0,
		});
	}
	updateButtonState();
}

//���� ��ư ������
descriptionBtn.addEventListener("click", function () {
	let sentences = JSON.parse(
		document.getElementById("description").dataset.fullDescription || "[]"
	);
	if (currentIndex < sentences.length - 1) {
		currentIndex++;
	}
	updateDescriptionAndButtons();
});

// ���� ��ư ������
previousDescriptionBtn.addEventListener("click", function () {
	let sentences = JSON.parse(
		document.getElementById("description").dataset.fullDescription || "[]"
	);
	if (currentIndex > 0) {
		currentIndex--;
	}
	updateDescriptionAndButtons();
});
