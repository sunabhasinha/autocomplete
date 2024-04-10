<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { useDebounce } from '../composable/useDebounce';

	const users = ref([]);
	const displayUsers = ref([]);
	const searchItem = ref('');

	const fetchUsers = async () => {
		const resJson = await fetch('https://jsonplaceholder.typicode.com/users');
		const res = await resJson.json();
		users.value = res;
	};

	onMounted(async () => {
		await fetchUsers();
	});

	const handleSearch = (e: any) => {
		const userInput = e.target.value.toLowerCase();
		if (!userInput) {
			displayUsers.value = [];
			return;
		}
		displayUsers.value = users.value.filter((user: any) =>
			user.name.toLowerCase().includes(userInput)
		);
	};

	const debouncedHandleSearch = useDebounce(handleSearch, 500);
</script>

<template>
	<input
		type="text"
		v-model="searchItem"
		@input="(e) => debouncedHandleSearch(e)"
	/>
	<ul v-for="(user, index) in displayUsers" :key="index">
		<li>{{ user.name }}</li>
	</ul>
</template>

<style scoped>
	.read-the-docs {
		color: #888;
	}
</style>
