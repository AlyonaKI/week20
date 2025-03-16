document
  .getElementById("fetchBtn")
  .addEventListener("click", function fetchData() {
    const category = document.getElementById("category").value;
    const id = document.getElementById("idInput").value.trim();

    const resultP = document.getElementById("result");
    const errorP = document.getElementById("error");
    const loadingP = document.getElementById("loading");

    resultP.textContent = "";
    errorP.textContent = "";
    loadingP.textContent = "Идёт загрузка...";

    const url = `https://swapi.py4e.com/api/${category}/${id}/`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response.status);
        }
        return response.json();
      })
      .then((data) => {
        if (data.name) {
          resultP.textContent = `${data.name}`;
        } else if (data.title) {
          resultP.textContent = `${data.title}`;
        } else {
          resultP.textContent = "Данные получены";
        }
      })
      .catch((error) => {
        if (error === 404) {
          errorP.textContent = "Ошибка 404: Данные не найдены";
        } else {
          errorP.textContent = "Сервер недоступен или произошла ошибка";
        }
      })
      .finally(() => {
        loadingP.textContent = "";
      });
  });
