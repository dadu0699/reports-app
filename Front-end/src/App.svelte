<script>
	import { onMount } from "svelte";

	import Form from "./components/Form.svelte";
	import Loader from "./components/Loader.svelte";
	import Notification from "./components/Notification.svelte";
	import Report from "./components/Report.svelte";

	let reports = [];
	let report = {};
	let loader = true;

	let searchValue = "";
	const handleInput = (e) => {
		searchValue = e.target.value;
		getData();
	};

	onMount(async () => {
		await getData();
	});

	const getData = async () => {
		const url = new URL("http://127.0.0.1:8080/report");
		loader = true;

		try {
			if (searchValue.length > 0)
				url.searchParams.append("identification", searchValue);

			const fetchResponse = await fetch(url);
			const data = await fetchResponse.json();

			reports = data["response"];
			loader = false;

			await showNotification(
				"List of reports serviced by",
				data["attendedBy"]
			);
		} catch (e) {
			console.log(e);
		}

		loader = false;
	};

	let notification = { message: "", server: "", show: false };
	const showNotification = async (message, server) => {
		notification.show = true;
		notification.message = message;
		notification.server = server;

		await new Promise((resolve) => setTimeout(resolve, 2500));
		notification.show = false;
	};

	const handleReport = (e) => {
		report = e.detail.report;
	};
</script>

<div class="container-fluid">
	<div class="row page-content">
		<div class="col-lg-3 col-md-4 col-12 layout-spacing align-self-center">
			<Form {report} {getData} {showNotification} />
		</div>

		<div class="col-lg-9 col-md-8 col-12 align-self-center">
			<div class="col-12 d-flex justify-content-center">
				<div class="wrap">
					<div class="search">
						<input
							type="text"
							class="search-term"
							placeholder="Search report ..."
							value={searchValue}
							on:input={handleInput}
						/>
						<button type="submit" class="search--button">
							<i class="bi bi-search" />
						</button>
					</div>
				</div>
			</div>

			<div class="col-12 d-flex align-items-center project-section">
				{#if loader}
					<Loader />
				{:else}
					{#each reports as report}
						<Report
							{report}
							{getData}
							{showNotification}
							on:getReport={handleReport}
						/>
					{/each}
					{#if reports.length == 0}
						<h3 class="center">
							<strong>Empty report list</strong>
						</h3>
					{/if}
				{/if}
			</div>

			<!-- <div class="col-12 d-flex align-items-start justify-content-end">
				<strong> Solicitud atendida por </strong>
			</div> -->
		</div>

		{#if notification.show}
			<Notification
				message={notification.message}
				server={notification.server}
			/>
		{/if}
	</div>
</div>

<style>
	.page-content {
		height: 100vh;
	}

	.project-section {
		display: flex;
		flex-flow: wrap;
		font-family: "Ubuntu", sans-serif;
		min-height: 480px;
		max-height: 50vh;
		overflow: auto;
		padding: 10px 25px;
		scroll-behavior: smooth;
		scroll-snap-type: y mandatory;
		scrollbar-color: #19c28a #f0f0f0;
		/* scrollbar-gutter: stable; */
		scrollbar-width: thin;
	}

	/* .project-section * { box-sizing: border-box;	} */

	.search {
		display: flex;
		position: relative;
		width: 100%;
	}

	.search-term {
		background: none;
		border-right: none;
		border: 2px solid #000;
		font-size: 1em;
		height: 40px;
		outline: none;
		padding: 10px;
		width: 100%;
	}

	.search--button {
		background: #000;
		border: 2px solid #000;
		color: #fff;
		cursor: pointer;
		font-size: 1em;
		height: 40px;
		width: 40px;
	}

	.center {
		text-align: center;
		width: 100%;
	}

	@media (max-width: 767px) {
		.search {
			height: 10vh;
		}
	}
</style>
