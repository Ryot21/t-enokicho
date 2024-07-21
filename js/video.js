
    // 動画アイテム(.hv-item)
    const hoverVideos = document.querySelectorAll(".hv-item");
    hoverVideos.forEach((hoverVideo) => {
        hoverVideo.addEventListener("mouseover", () => hoverVideo.play());
        hoverVideo.addEventListener("mouseout", () => hoverVideo.pause());
    });

