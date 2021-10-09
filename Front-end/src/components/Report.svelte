<script>
    import { createEventDispatcher } from "svelte";

    export let report = {
            reportID: "",
            course: "",
            user: "",
            identification: "",
            currentDate: "",
            detail: "",
            server: "",
        },
        getData,
        showNotification;

    const dispatch = createEventDispatcher();

    const deleteReport = async () => {
        const url = new URL("http://127.0.0.1:8080/report");
        url.searchParams.append("reportID", report.reportID);

        const settings = {
            method: "DELETE",
        };

        try {
            const fetchResponse = await fetch(url, settings);
            const data = await fetchResponse.json();

            await getData();
            await showNotification(
                "Elimination of the report attended by",
                data["response"]["attendedBy"]
            );
        } catch (e) {
            console.log(e);
        }
    };

    const setReport = () => {
        dispatch("getReport", {
            report,
        });
    };
</script>

<div class="report-container">
    <div class="report {report.reportID % 2 == 0 ? 'report--dark' : ''}">
        <div class="report-card">
            <div class="report--display">
                <i>{report.course}</i>
                <h2>{report.identification} - {report.user}</h2>
            </div>
            <div class="report--hover">
                <div class="d-flex flex-row-reverse bd-highlight">
                    <button class="trash--button" on:click={deleteReport}>
                        <i class="bi bi-trash-fill" />
                    </button>
                </div>

                <h2>{report.currentDate}</h2>
                <p>{report.detail}</p>
                <p class="link" on:click={setReport}>View report</p>

                <div
                    class="d-flex align-items-end flex-column bd-highlight mb-3"
                    style="height: 50%;"
                >
                    <strong class="mt-auto p-2 bd-highlight text-muted">
                        {report.server}
                    </strong>
                </div>
            </div>
        </div>
        <div class="report--border" />
    </div>
</div>

<style>
    .report-container {
        flex: 300px;
        margin: 30px;
        scroll-snap-align: center;
    }

    .report-container .report {
        font-weight: bold;
        position: relative;
        width: 100%;
    }

    .report-container .report .report-card {
        background: #fff;
        border: 2px solid black;
        color: black;
        display: block;
        height: 400px;
        padding: 30px;
        text-decoration: none;
        transition: 0.25s ease;
        width: 100%;
    }

    .report-container .report .report-card:hover {
        border-color: #00bc7e;
        transform: translate(-30px, -30px);
    }

    .report-container .report .report-card:hover .report--display {
        display: none;
    }

    .report-container .report .report-card:hover .report--hover {
        display: block;
    }

    .report-container .report .report-card .report--display i {
        font-size: 60px;
        margin-top: 200px;
    }

    .report-container .report .report-card .report--display h2 {
        margin: 20px 0 0;
    }

    .report-container .report .report-card .report--hover {
        display: none;
        height: 100%;
    }

    .report-container .report .report-card .report--hover h2 {
        margin: 20px 0;
    }

    .report-container .report .report-card .report--hover p {
        font-weight: normal;
        line-height: 1.5;
    }

    .report-container .report .report-card .report--hover p.link {
        color: #00bc7e;
        cursor: pointer;
        font-weight: bold;
        margin: 20px 0 0;
    }

    .report-container .report .report-card .report--hover p.link:hover {
        color: #00d68f;
    }

    .report-container .report .report--border {
        border: 3px dashed black;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: -1;
    }

    .report-container .report.report--dark .report-card {
        background-color: black;
        border-color: black;
        color: #fff;
    }

    .report-container .report.report--dark .report-card .report--hover .link {
        color: #00bc7e;
    }

    .report-container .report .report-card .report--hover .trash--button {
        background: transparent;
        border: none;
        color: #c21951;
        cursor: pointer;
        font-size: 1.25em;
    }

    .report-container .report .report-card .report--hover .trash--button:hover {
        color: #d91c5a;
    }
</style>
