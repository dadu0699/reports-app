<script>
  export let message = "",
    server = "";
</script>

<div class="notification">
  <div class="rectangle">
    <div class="notification-text">
      <i class="bi bi-info-circle-fill" />
      <span>&nbsp;&nbsp;</span>
      <span>
        {message}
        <b>{server}</b>
      </span>
    </div>
  </div>
</div>

<style>
  .notification {
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 90vh;
    z-index: 1;
  }

  .rectangle {
    align-items: center;
    animation: scale-in 0.3s ease-out forwards,
      expand 0.35s 0.25s ease-out forwards;
    background: #000;
    color: #fff;
    display: flex;
    height: 50px;
    justify-content: flex-start;
    opacity: 0;
    overflow: hidden;
    position: relative;
    transform: scale(0);
    width: 200px;
  }

  .notification-text {
    align-items: center;
    animation: fade-in 1s ease-in forwards;
    display: flex;
    font-size: 15px;
    padding: 0 16px;
  }

  @keyframes scale-in {
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes expand {
    50% {
      width: 400px;
    }
    100% {
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 3px 3px -1px rgba(0, 0, 0, 0.12);
      width: 400px;
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.8;
    }
  }
</style>
