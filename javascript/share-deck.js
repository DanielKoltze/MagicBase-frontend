async function postShareDeckToUser(username, containerId, type) {
  let body = {
    username: username,
    containerId: containerId
  };

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  await makeRequest(BASE_URL + "/" + type + "/share", settings);
}



function shareDeckToUserModal() {
  const container = document.querySelector(".shareDeckToUser-modal");
  container.innerHTML = "";
  container.innerHTML = `
    <div
      class="modal fade shareDeck-modal"
      id="shareDeckmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content modal-content-color">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Share Deck</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form style="color: white; position: relative" class="login-form">
              <div class="form-outline">
                <input
                  type="text"
                  id="share-deck-username"
                  class="form-control form-control-lg logInUsernameInput"
                  placeholder="Enter Username"
                />
                <label class="form-label" for="share-deck-username"
                  >Username</label
                >
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary shareDeckBtn"
              id="submit-shareDeckButton"
            >
              Share Deck
            </button>
          </div>
        </div>
      </div>
    </div>
    `;

}