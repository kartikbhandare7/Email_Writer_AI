console.log("Content script loaded this is the content script.");

function createAIButton() {
    const button = document.createElement('button');
    // button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.className = 'T-I J-J5-Ji T-I-atl';
    button.style.marginLeft = "8px";
    button.style.marginRight = '8px';
    button.innerText = 'AI Reply';
    button.setAttribute('role', 'button');    
    button.setAttribute('data-tooltip', 'Generate AI Reply');    
    return button;

}

// function findComposeToolbar() {
//     const selector = [
//         '.btC', // Gmail compose toolbar
//         '.aDh', // Gmail reply toolbar
//         '[role="toolbar"]',
//         '.gU.Up' 
//     ];

//     for(const selector of selectors) {
//         const toolbar = document.querySelector(selector);
//         if(toolbar) return toolbar;
//     }
//     return null; 
// }

function findComposeToolbar() {
    const sendBtn = document.querySelector(
        '[role="button"][data-tooltip^="Send"]'
    );

    if (!sendBtn) return null;

    return sendBtn;
};

// function getEmailContent() {
//     const selectors = [
//         '.h7', // Gmail compose toolbar
//         '.a3s.aiL', // Gmail reply toolbar
//         '.gmail_quote', // Gmail quoted text
//         '[role="presentation"]'
//     ];

//     for(const selector of selectors) {
//         const content = document.querySelector(selector);
//         if(content) return content.innerText.trim();
//     }
//      return " "; 
// }

function getEmailContent() {
    
    const emailContent = document.querySelector('.a3s');

    return emailContent
        ? emailContent.innerText.trim()
        : '';
}

function injectButton() {
    const existingButton = document.querySelector(".ai-reply-button");
    if(existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if(!toolbar) {
        console.log("Toolbar not found, retrying...");
        return;
    }
    console.log("Toolbar found, injecting button.");
    const button = createAIButton();
    button.classList.add("ai-reply-button");

    button.addEventListener("click", async () => {
        try{
            button.innerText = "Generating...";
            button.disabled = true;

            const emailContent = getEmailContent();
            console.log("Email Content:", emailContent?.innerText);
            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    emailContent : emailContent,
                    tone : "professional"
                
                })
            });
            if(!response.ok) throw new Error("API request failed.......");
            
            const generatedReply = await response.text();
            
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

            if(composeBox) {
                composeBox.focus();
                // document.execCommand('insertText', false, generatedReply);
                composeBox.textContent = generatedReply;
                composeBox.dispatchEvent(
                    new Event('input', { bubbles: true })
                );
            }else console.error("Compose box not found.");
        }catch(error){
            console.error(error);
            alert("Failed to generate AI reply. Please try again.");
        }finally{
            button.innerText = "AI Reply";
            button.disabled = false;
        }
    });

    // toolbar.insertBefore(button, toolbar.firstChild);
    toolbar.parentElement.insertBefore(
    button,
    toolbar.nextSibling
);
}

// const observer = new MutationObserver((mutations) => {
//     for (const mutation of mutations) {
//         const addedNodes = Array.from(mutation.addedNodes);

//         const hasComponentElements = addedNodes.some(node =>
//             node.nodeType === Node.ELEMENT_NODE &&
//             (
//                 node.matches('.aDh, .btC, [role="dialog"]') ||
//                 node.querySelector('.aDh, .btC, [role="dialog"]')
//             )
//         );

const observer = new MutationObserver(() => {
    if (
        document.querySelector('[aria-label="Message Body"]') &&
        !document.querySelector('.ai-reply-button')
    ) {
        injectButton();
    }
});

        // if (hasComponentElements) {
        //     console.log("compose window detected yoo done brother main thing");
        //     setTimeout(injectButton, 500);
        // }
    

observer.observe(document.body, {
    childList: true,
    subtree: true
});