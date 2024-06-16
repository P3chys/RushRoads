
const assetSpeed = 1;
const removeBoundry=200;

export function handleAssets(assets, scene){
    assets.forEach(asset => {
        asset.position.z += assetSpeed;
        if (asset.position.z > removeBoundry) {
            scene.remove(asset);
            assets.shift();
        }
    });
    return assets
}
