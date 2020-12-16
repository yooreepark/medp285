const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'It is 11:00PM on a Friday night and you are at a college fraternity party.',
    options: [
      {
        text: 'Take a drink',
        setState: { drunk: true },
        nextText: 2
      },
      {
        text: 'Refuse drinks',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'You feel slightly tipsy and it is getting late.',
    options: [
      {
        text: 'Leave by yourself',
        requiredState: (currentState) => currentState.drunk,
        nextText: 4
      },
      {
        text: 'Drink a but more and leave with your friends',
        requiredState: (currentState) => currentState.drunk,
        nextText: 5
      },
    ]
  },
  {
    id: 3,
    text: 'You decide to leave the party early by yourself since you are sober.',
    options: [
      {
        text: 'Walk home alone',
        nextText: 7
      },
      {
        text: 'Walk with a group of people',
        nextText: 5
      },
    ]
  },
  {
    id: 4,
    text: 'You feel slightly nauseous and dizzy.',
    options: [
      {
        text: 'You keep walking and try your best to get home as soon as possible',
        requiredState: (currentState) => currentState.drunk,
        nextText: 7
      },
       {
          text: 'You rest for a bit on the side of the road',
          requiredState: (currentState) => currentState.drunk,
         nextText: 6
        }
    ]
  },
  {
    id: 5,
    text: 'You arrive at an intersection alone 0.8 miles away from your house. You are exhaused and want to ger home as soon as possible.',
    options: [
      {
        text: 'Take the dim and short route',
        nextText: 7
      },
      {
        text: 'Take the bright and long route',
        nextText: 8
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up with a throbbing headache in an unfamiliar room naked and bleeding.',
    options: [
      {
        text: 'Next',
        nextText: 9
      }

    ]
  },
  {
    id: 7,
    text: 'You turn the corner and sense something nearby. Everything turns black.',
    options: [
      {
        text: 'Next',
        nextText: 6
      },
    ]
  },
  {
    id: 8,
    text: 'You are walking down a long road and you feel like you are being followed.',
    options: [
      {
        text: 'Run',
        nextText: 7
      },
      {
        text: 'You convince yourself that you are overreacting and keep walking',
        nextText: 7
      }
    ]
  },
  {
    id: 9,
    text: 'You realize you have been sexually assaulted. You do not remember much.',
    options: [
      {
        text: 'Immediately flee the scene',
        nextText: 11
      },
      {
        text: 'Immediately call the police',
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text: 'You try to testify to the police that you think you were sexually assaulted, but your testimony is not strong enough since you were either drunk and/or cannot remember much. The perpetrator also claims that it was consensual.',
    options: [
      {
        text: 'Try Again',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'A long time has passed since the incident took place. You finally gather the courage to report it, but the statute of limitations has passed, so the police cannot investigate the issue.',
    options: [
      {
        text: 'Try Again.',
        nextText: -1
      }
    ]
  }
]

startGame()
