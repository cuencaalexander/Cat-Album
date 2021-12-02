import { useEffect, useState } from "react";
import { Card, Button, Icon, Image } from "semantic-ui-react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./redux/cat/cat.reducer";
import { addCat } from "./redux/cat/cat.action";
import { API_ENDPOINT } from "./constants";

function App() {
  const dispatch = useDispatch();

  const [fetchInProgress, setfetchInProgress] = useState<boolean>(true);
  const cats = useSelector((store: AppState) => store.cat.cats);
  const totalCats = cats.length;
  const [index, setIndex] = useState<number>(cats.length);
  const displayCat = cats[index - 1];

  useEffect(() => {
    getNewCat();
  }, []);

  useEffect(() => {
    setIndex(cats.length);
  }, [cats]);

  const getNewCat = () => {
    setfetchInProgress(true);
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((res) => {
        const cat = res[0];
        dispatch(addCat(cat));
        setfetchInProgress(false);
      })
      .catch((err) => {
        setfetchInProgress(false);
        console.log(err);
      });
  };

  return (
    <div className="App">

      {!fetchInProgress && displayCat && (
        <Card color='blue'>
          <Image src={displayCat.url} wrapped ui={false} />
          <Card.Content>
            {displayCat.categories && (
              <Card.Header>
                Categories :{" "}
                {displayCat.categories
                  ?.map((category) => category.name)
                  .join(",")}
              </Card.Header>
            )}
            <Card.Meta>
              <p>Image Height: {displayCat.height}</p>
              <p>Image Width: {displayCat.width}</p>
              <p className="url">Url: {displayCat.url}</p>
            </Card.Meta>
            <Card.Description>
              {displayCat.breeds?.map((breed) => breed.description).join(", ")}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              animated
              onClick={() => setIndex((prev) => prev - 1)}
              disabled={index === 1}
            >
              <Button.Content visible>Prev</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow left" />
              </Button.Content>
            </Button>
            <Button
              animated
              onClick={() => setIndex((prev) => prev + 1)}
              disabled={index === totalCats}
            >
              <Button.Content visible>Next</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Card.Content>
          <Card.Content extra>
            <Button animated onClick={getNewCat}>
              <Button.Content visible>Fetch New Cat</Button.Content>
              <Button.Content hidden>
                <Icon name="refresh" />
              </Button.Content>
            </Button>
          </Card.Content>
        </Card>
      )}
    </div>
  );
}

export default App;
