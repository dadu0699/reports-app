<script>
    const cleanReport = {
        reportID: undefined,
        course: "",
        user: "",
        identification: "",
        currentDate: "",
        detail: "",
    };

    export let api, 
        report = { ...cleanReport },
        getData,
        showNotification;

    let title, edit;
    $: {
        title = report.reportID !== undefined ? "Update" : "New";
        edit = report.reportID !== undefined ? true : false;
    }

    const handleSubmit = async () => {
        if (!edit) {
            await addReport();
        } else {
            await updateReport();
        }
    };

    const addReport = async () => {
        const url = new URL(`${api}/report`);
        const settings = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(report),
        };

        try {
            const fetchResponse = await fetch(url, settings);
            const data = await fetchResponse.json();

            setReport();
            await getData();
            await showNotification(
                "Aggregation of the report attended by",
                data["response"]["attendedBy"]
            );
        } catch (e) {
            console.log(e);
        }
    };

    const updateReport = async () => {
        const url = new URL(`${api}/report`);
        url.searchParams.append("reportID", report.reportID);

        const settings = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(report),
        };

        try {
            const fetchResponse = await fetch(url, settings);
            const data = await fetchResponse.json();

            await getData();
            await showNotification(
                "Update of the report attended by",
                data["response"]["attendedBy"]
            );
        } catch (e) {
            console.log(e);
        }
    };

    const setReport = () => {
        report = { ...cleanReport };
    };
</script>

<div class="form d-flex align-content-center flex-wrap">
    <div class="col-12 d-flex align-items-center header">
        <h1>
            {title} <br /> Report
        </h1>
        {#if edit}
            <button class="cancel--button" on:click={setReport}>
                <i class="bi bi-back" />
            </button>
        {/if}
    </div>

    <div class="col-12">
        <form on:submit|preventDefault={handleSubmit}>
            <div class="form--inputbox">
                <input
                    type="text"
                    placeholder="Course"
                    required="required"
                    bind:value={report.course}
                />
            </div>

            <div class="form--inputbox">
                <input
                    type="text"
                    placeholder="User ID"
                    required="required"
                    bind:value={report.identification}
                />
            </div>

            <div class="form--inputbox">
                <input
                    type="text"
                    placeholder="User"
                    required="required"
                    bind:value={report.user}
                />
            </div>

            <div class="form--inputbox">
                <textarea
                    placeholder="Detail"
                    rows="2"
                    maxlength="250"
                    required="required"
                    bind:value={report.detail}
                />
            </div>

            <div class="form--inputbox">
                <button type="submit">SAVE</button>
            </div>
        </form>
    </div>
</div>

<style>
    .form {
        padding: 0px 10px;
    }

    .form .header {
        margin-bottom: 20px;
    }

    .form .header h1 {
        border-left: 5px solid #00bc7e;
        color: #000;
        font-size: 2em;
        font-weight: bold;
        letter-spacing: 5px;
        padding: 10px;
    }

    .form .form--inputbox {
        margin-bottom: 20px;
        position: relative;
        width: 100%;
    }

    .form .form--inputbox button,
    .form .form--inputbox input,
    .form .form--inputbox textarea {
        background: none;
        border: 2px solid #000;
        font-size: 1.2em;
        left: 0;
        outline: none;
        padding: 10px;
        top: 0;
        width: 100%;
    }

    .form .form--inputbox textarea {
        resize: none;
        scrollbar-color: #19c28a #f0f0f0;
        scrollbar-width: thin;
    }

    .form .form--inputbox button {
        background: #00bc7e;
        border: #fff;
        color: #fff;
        font-weight: 700;
        width: 100%;
    }

    .form .form--inputbox:hover button {
        background: #19c28a;
    }

    .cancel--button {
        background: transparent;
        border: none;
        color: #000;
        cursor: pointer;
        font-size: 1.2em;
        width: 100%;
    }

    .cancel--button:hover {
        color: #19c28a;
    }

    @media (max-width: 767px) {
        .form {
            height: 100vh;
        }
    }
</style>
