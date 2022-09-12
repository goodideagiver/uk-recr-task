const userIdsWithTheSameName = users.map((user) => {
	const { name } = user;

	const nameWithoutNumber = name.match(/[A-Z]/g, '');

	if (alreadyPickedNames.includes(nameWithoutNumber)) return 0;

	alreadyPickedNames.push(nameWithoutNumber);
	return users.filter(
		(userOfFilteredArray) =>
			userOfFilteredArray.name.match(/[A-Z]/g, '') === nameWithoutNumber
	);
});
