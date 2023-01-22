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
    bodyObserver.observe(body, {childList: true})
}

/**
 * This is the initial observer that is essentially waiting for react div to mount
 */
 const bodyObserver = new MutationObserver(mutationList => {
    const individualTweet = document.querySelector('[data-testid="cellInnerDiv"]')
    const timeline = individualTweet?.parentElement

    if(timeline) {
        timelineObserver.observe(timeline, {childList: true})
    }
})

/**
 * After react div is mounted and we found our timeline we can then get into our group
 * and find the 
 */
const timelineObserver = new MutationObserver(mutationList => {
    const group = document.querySelectorAll('[role="group"]')
    if(group.length) {
        window.dispatchEvent(new CustomEvent('groupRoleExists', {detail: group}))
    }
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
