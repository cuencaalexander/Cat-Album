import { act, cleanup, render } from "@testing-library/react";
import App from "./App";
import { API_ENDPOINT } from "./constants";
import { renderComponent } from "./utils/test";

describe("App", () => {
    const mockFetch = jest.fn();

    beforeEach(() => {
        global.fetch = mockFetch;
        mockFetch.mockImplementation(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () =>
                    Promise.resolve({
                        breeds: [
                            {
                                weight: {
                                    imperial: "7 - 14",
                                    metric: "3 - 6",
                                },
                                id: "hima",
                                name: "Himalayan",
                            },
                        ],
                        id: "uywhSIAHr",
                        url: "https://cdn2.thecatapi.com/images/uywhSIAHr.jpg",
                        width: 1280,
                        height: 720,
                    }),
            } as any)
        );
    });

    afterEach(() => {
        (global.fetch as any).mockRestore();
        cleanup();
    });

    test("renders correctly", () => {
        act(() => {
            renderComponent(App);
        });

        expect(mockFetch).toHaveBeenCalledWith(API_ENDPOINT);
    });
});
