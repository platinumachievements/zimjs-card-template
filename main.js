// {
//   /* <script type="module"> */
// }
import zim from "https://zimjs.org/cdn/016/zim";

// Initialization
const scaling = FIT;
const width = 780;
const height = 1065;
const color = white;
const outerColor = dark;
new Frame(scaling, width, height, color, outerColor, ready);

function ready() {
  zog("ready from ZIM Frame");

  new Button(200, 60, "CLICK").loc(0, 0).tap(() => {
    zog("clicking");

    cardcreator();
  });

  // Grid Manager
  const manager = new GridManager();
  manager.add(new Grid({ color: black }).loc(0, 0));
}

function cardcreator() {
  let gameContainer = new Container();

  fetch("games.json")
    .then((response) => response.json())
    .then((data) => {
      data.games.forEach((game) => {
        gameContainer.addChild(createGameElements(game));
      });
      //   gameContainer.scale = 0.4;
      gameContainer.center();
      S.addChild(gameContainer);
      S.update(); //not required i dont think
    })
    .catch((error) => console.error("Error loading JSON:", error));
}

function createGameElements(game) {
  let gameElements = new Container();

  gameElements.addChild(createImage(game.imageUrl));
  gameElements.addChild(createImage("./images/PS4 Template V2.png"));
  gameElements.addChild(
    createLabel(game.gameTitle, 460, 185, 455, 80, 100, 70)
  );
  gameElements.addChild(
    createLabel(game.trophyName, 380, 928, 360, 60, 100, 60)
  );
  let infoContainer = createInfoContainers(
    game.date,
    game.username,
    game.rarity
  );
  gameElements.addChild(infoContainer);
  return gameElements;
}

function createImage(file) {
  return new Pic({
    file: file,
    width: 780,
    height: 1065,
  }).centerReg();
}

function createLabel(text, x, y, labelWidth, labelHeight, size, maxSize) {
  return new Label({
    text: text,
    size: size,
    align: CENTER,
    valign: CENTER,
    color: white,
    rollColor: red,
    labelWidth: labelWidth,
    labelHeight: labelHeight,
    maxSize: maxSize,
  }).loc(x, y);
}

function createInfoContainers(date, username, rarity) {
  const myColor = "rgba(211, 211, 211, 0.1)";
  let containerData = [
    { x: 290, y: 750, text: "Date", width: 190, height: 35 },
    { x: 290, y: 800, text: "Username", width: 190, height: 35 },
    { x: 290, y: 850, text: "Rarity", width: 190, height: 35 },
    { x: 520, y: 750, text: date, width: 220, height: 35 },
    { x: 520, y: 800, text: username, width: 220, height: 35 },
    { x: 520, y: 850, text: rarity, width: 220, height: 35 },
  ];

  let infoContainer = new Container();

  containerData.forEach((data) => {
    let info = createInfo(
      data.x,
      data.y,
      data.text,
      data.width,
      data.height,
      myColor
    );
    infoContainer.addChild(info);
  });
  return infoContainer;
}

function createInfo(x, y, labelText, width, height, color) {
  let rectangle = new Rectangle({
    width: width,
    height: height,
    color: color,
    corner: [50, 20],
  })
    .centerReg()
    .loc(x, y);

  let label = new Label({
    text: labelText,
    size: 25,
    color: white,
    align: CENTER,
    valign: CENTER,
    labelWidth: width,
    labelHeight: height,
    maxSize: 25,
  });

  rectangle.addChild(label);
  label.centerReg(rectangle);

  return rectangle;
}
// </script>
