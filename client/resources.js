
const RESOURCE_BLUE_OVERLAY = "resources/groundTexture/blueOverlay.png";
const RESOURCE_RED_OVERLAY = "resources/groundTexture/redOverlay.png";
const RESOURCE_GREEN_OVERLAY = "resources/groundTexture/greenOverlay.png";
const RESOURCE_YELLOW_OVERLAY = "resources/groundTexture/yellowOverlay.png";
const RESOURCE_FOG_OF_WAR = "resources/groundTexture/fogOfWar.png";

const RESOURCE_DEFAULT_TILE = "resources/groundTexture/defaultTile.png";
const RESOURCE_BRUSH_TILE = "resources/groundTexture/brushTile.png";
const RESOURCE_MINERAL_TILE = "resources/groundTexture/mineralTile.png";
const RESOURCE_BIG_MINERAL_TILE = "resources/groundTexture/bigMineralTile.png";
const RESOURCE_ROCK = "resources/groundTexture/rock.png";
const RESOURCE_HIGH_TILE = "resources/groundTexture/highTile.png";
const RESOURCE_LOW_TILE = "resources/groundTexture/lowTile.png";

const RESOURCE_UI_TOP_RIGHT = "resources/gui/topRight.png";
const RESOURCE_UI_BOTTOM_LEFT = "resources/gui/bottomLeft.png";
const RESOURCE_UI_BOTTOM_RIGHT = "resources/gui/bottomRight.png";
const RESOURCE_CURSOR = "resources/cursor.png";
const RESOURCE_BACKGROUND = "resources/background.png";

var resourcesToLoad = [RESOURCE_BACKGROUND,
    RESOURCE_BLUE_OVERLAY,
    RESOURCE_RED_OVERLAY,
    RESOURCE_GREEN_OVERLAY,
    RESOURCE_YELLOW_OVERLAY,
    RESOURCE_FOG_OF_WAR,
    RESOURCE_DEFAULT_TILE,
    RESOURCE_BRUSH_TILE,
    RESOURCE_MINERAL_TILE,
    RESOURCE_BIG_MINERAL_TILE,
    RESOURCE_ROCK,
    RESOURCE_HIGH_TILE,
    RESOURCE_LOW_TILE,
    RESOURCE_UI_TOP_RIGHT,
    RESOURCE_UI_BOTTOM_LEFT,
    RESOURCE_UI_BOTTOM_RIGHT,
    RESOURCE_CURSOR];

var resources = {};

const tiles = [RESOURCE_DEFAULT_TILE,
    RESOURCE_BRUSH_TILE,
    RESOURCE_MINERAL_TILE,
    RESOURCE_BIG_MINERAL_TILE,
    RESOURCE_ROCK,
    RESOURCE_HIGH_TILE,
    RESOURCE_LOW_TILE];

function loadResource(location, key, url, deferArr) {
    var deferred = new $.Deferred();
    location[key] = new Image();
    location[key].onload = function () {
        console.log("Resource loaded: " + url);
        deferred.resolve();
    };
    location[key].onerror = function () {
        console.error("Couldn't load resource: " + url);
    };
    location[key].src = url;
    deferArr.push(deferred);
}

function loadResources(deferArr) {
    for (var i = 0; i < resourcesToLoad.length; i++) {
        loadResource(resources, resourcesToLoad[i], resourcesToLoad[i], deferArr);
    }
    Object.keys(structures).forEach(function(name) {
        var url = "resources/structures/" + name.toLowerCase().replace(/ /g, '') + ".png";
        loadResource(structures[name], "image", url, deferArr);
    });
    console.log(structures);
    Object.keys(units).forEach(function (name) {
        var url = "resources/units/" + name.toLowerCase().replace(/ /g, '') + ".png";
        loadResource(units[name], "image", url, deferArr);
    });
}