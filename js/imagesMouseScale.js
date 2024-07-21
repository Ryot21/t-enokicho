
// 完全前田オリジナルです。
// 勝手に書き換えて期待される挙動にならなくなった場合、対応できませんのでご了承ください。
const container = document.getElementById('canvasContainer');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const image = new Image();
const MAX_SCALE = 2; // 合計の拡大量（x2）
const SCALE_STEP = .5;// 一回の拡大幅
let imageScale = 1, imageScaleIndex = 0;

// 要素_横幅,縦幅
canvas.width = container.clientWidth;
canvas.height = container.clientHeight;

// マウス座標
let mouseX, mouseY;

// 拡大・縮小後の画像表示領域
let zoomWidth, zoomHeight, zoomLeft = 0, zoomTop = 0;

canvas.addEventListener('mousewheel', canvasZoom);
canvas.addEventListener('mouseover', disableScroll);
canvas.addEventListener('mouseout', enableScroll);

function draw() {
    image.addEventListener("load", function(){
        // 画像のスケーリング表示
        ctx.drawImage(image, zoomLeft, zoomTop, canvas.width / imageScale, canvas.height / imageScale, 0, 0, canvas.width, canvas.height);

        // 倍率の描画
        ctx.font = '30px "arial black"';
        ctx.fillStyle = 'white';
        ctx.fillText('x' + imageScale.toFixed(1), 390, 300);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeText('x' + imageScale.toFixed(1), 390, 300);
        
        // 枠の描画
        ctx.lineWidth = 3;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
    });
    image.src = "images/SVG/sample/location-map.svg";
}

function canvasZoom(e) {
    // Canvas上マウス座標の取得
    let rect = e.target.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    if (e.wheelDelta > 0) {
        imageScaleIndex++;
        imageScale = 1 + imageScaleIndex * SCALE_STEP;
        if (imageScale > MAX_SCALE) {
            imageScale = MAX_SCALE;
            imageScaleIndex--;
        } else {
            zoomWidth = canvas.width / imageScale;
            zoomHeight = canvas.height / imageScale;

            zoomLeft += mouseX * SCALE_STEP / (imageScale * (imageScale - SCALE_STEP));
            zoomLeft = Math.max(0, Math.min(canvas.width - zoomWidth, zoomLeft));

            zoomTop += mouseY * SCALE_STEP / (imageScale * (imageScale - SCALE_STEP));
            zoomTop = Math.max(0, Math.min(canvas.height - zoomHeight, zoomTop));
        }
    } else {
        imageScaleIndex--;
        imageScale = 1 + imageScaleIndex * SCALE_STEP;
        if (imageScale < 1) {
            imageScale = 1;
            zoomLeft = 0;
            zoomTop = 0;
            imageScaleIndex = 0;
        } else {
            zoomWidth = canvas.width / imageScale;
            zoomHeight = canvas.height / imageScale;
            
            zoomLeft -= mouseX * SCALE_STEP / (imageScale * (imageScale + SCALE_STEP));
            zoomLeft = Math.max(0, Math.min(canvas.width - zoomWidth, zoomLeft));
            
            zoomTop -= mouseY * SCALE_STEP / (imageScale * (imageScale + SCALE_STEP));
            zoomTop = Math.max(0, Math.min(canvas.height - zoomHeight, zoomTop));
        }
    }
    
    draw();
}

// Cnavas上ではブラウザのスクロールを無効に
function disableScroll() {document.addEventListener("mousewheel", scrollControl, { passive: false });}
function enableScroll() {document.removeEventListener("mousewheel", scrollControl, { passive: false });}
function scrollControl(e) {e.preventDefault();}

draw();