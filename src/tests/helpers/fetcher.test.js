import { fetchData } from "../../helpers/fetcher";
import axios from "axios";
jest.mock("axios");

describe("fetchData", () => {
  it("fetches successfully data from an API", async () => {
    jest.resetAllMocks();
    const res = {
      data: {
        category: [
          {
            id: "1",
            name: "a",
          },
          {
            id: "2",
            name: "b",
          },
        ],
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(res));

    await fetchData("/test").then((response) => {
      expect(response).toEqual(res.data);
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(fetchData("react")).rejects.toThrow(errorMessage);
  });
});
