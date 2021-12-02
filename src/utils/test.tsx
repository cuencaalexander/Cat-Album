import { render } from "@testing-library/react";
import { FC } from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

export function renderComponent(Component: FC, props = {}) {
    const store = mockStore({ cat: { cats: [] } });
    return [
        render(
            <Provider store={store}>
                <Component {...props} />
            </Provider>
        ),
        store,
    ]
}