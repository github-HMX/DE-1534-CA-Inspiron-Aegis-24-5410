function RTOpenARViewer(arSrc) {
//console.log("arSrc", arSrc)
    if (arSrc.endsWith(".usdz")) {
        const anchor = document.createElement('a');
        anchor.setAttribute('rel', 'ar');
        anchor.appendChild(document.createElement('img'));
        anchor.setAttribute('href', arSrc);
        anchor.click();
    } else {
        const locationUrl = new URL(self.location.toString());
        const modelUrl = new URL("intent://arvr.google.com/scene-viewer/1.0?file=" + encodeURIComponent(arSrc));
        const scheme = locationUrl.protocol.replace(':', '');
        modelUrl.protocol = 'intent://';
        const intent = `${modelUrl.toString()}&mode=ar_only#Intent;scheme=${scheme};package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(locationUrl.toString())};end;`;
        const anchor = document.createElement('a');
        anchor.setAttribute('href', intent);
        anchor.click();
    }
};

