// 1) Find the timeline section and listen to updates on the node
// 2) On node updates search for all groups within the timeline. Groups = replies, retweets, views and shares
// 3) Find that bastard and prune it
// 4) Return to the truth

// Using enums means that you're better than everyone else.
const nodeTypeEnum = {
    ELEMENT: 1
}

const roleEnum = {
    GROUP: 'group',
    LINK: 'link'
}

const elementEnum = {
    BODY: 'body'
}

/**
 * Everything starts here, even with the manifest rules this onload DOES NOT mean that react has finished rendering
 */
 window.onload = function() {
    const body = document.querySelector(elementEnum.BODY)
    bodyObserver.observe(body, {attributes: true, childList: true, subtree: true})
}

/**
 * This is the initial observer that is essentially waiting for react div to mount
 */
 const bodyObserver = new MutationObserver(mutationList => {
    mutationList.forEach((mutation) => {
        const allTwitterViews = mutation.target.querySelectorAll('[data-testid="tweet"] [role="group"] div:has(a[href*="analytics"]')
        allTwitterViews.forEach((twitterView) => {
            twitterView.remove()
        } )
    })
})

/**
 * This event emitter was just me using CustomEvents again for the first time in a while :P
 */
window.addEventListener('groupRoleExists', ({detail: group}) => {
    group.forEach((item) => {
        const twitterViews = item.childNodes.item(3)
        if(twitterViews && twitterViews.lastElementChild.role === roleEnum.LINK) {
            // FUCK YOU TWITTER VIEWS, you will no longer make me misclick
            twitterViews.remove()
        }
    })   
})
