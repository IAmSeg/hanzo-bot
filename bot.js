var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
 token: auth.token,
 autorun: true
});

bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

var offeringMessages = [
  'a dishonor to yourself and to House Shimada. You should be ashamed.',
  'disgraceful.',
  'made in haste. Take your time to honor a great house.',
  'in need of practice. Step into my dojo.',
  'satisfactory.',
  'pleasing, but you can do better.',
  'a gift given in good favor.',
  'honorable. My brother Genji would be proud.',
  'very pleasing. I shall name my next arrow after your house.',
  'truly worthy of a warrior. You honor yourself and House Shimada.',
  'mind blowing. You are a great warrior and teammate. It is known.'
];

var apologyMessages = [
  'Your sins have been forgiven.',
  'You have wronged House Shimada. Shame shall fall upon your head.',
  'Everyone falls. Not everyone can climb walls to get back up.',
  'You have been enlightened. Go forth. See what the dragon sees.',
  'No amount of flattery can repair the damage you have done.'
];

var helloMessages = [
  'Greetings, Warrior ',
  'Hi, ',
  'It is an honor, ',
  'The pleasure is mine, '
];

var offeringTriggers = [
  'offering',
  'offer'
];

var apologyTriggers = [
  'apologize',
  'apology',
  'forgive',
  'forgiveness',
  'sorry'
];

var helloTriggers = [
  'hello',
  'hi',
  'hey'
];

var whatsBetterTriggers = [
  'whats better'
];

bot.on('message', function (user, userID, channelID, message, evt) {
  if (userID == 350043625620635648)
    return;

  // checking if the user has made an offering
  if (messageContainsTrigger(offeringTriggers, message)) {
    var message = 'Your offering was... ';
    // roll a die for how good the offering was
    var result = Math.floor(Math.random() * 11);

    bot.sendMessage({
      to: channelID,
      message: message + offeringMessages[result]
    });
  }

  // checking if the user has asked for forgiveness
  if (messageContainsTrigger(apologyTriggers, message)) {
    var result = Math.floor(Math.random() * 5);

    bot.sendMessage({
      to: channelID,
      message: apologyMessages[result]
    });
  }

  if (messageContainsTrigger(helloTriggers, message)) {
    var result = Math.floor(Math.random() * 4);
    bot.sendMessage({
      to: channelID,
      message: helloMessages[result] + '<@' + userID + '>'
    });
  }

  if (message.toLowerCase().indexOf('flip a coin') != -1) {
    var result = Math.random();
    var message = 'Tails.';
    if (result < .5)
      message = 'Heads.';

    bot.sendMessage({
      to: channelID,
      message
    });
  }

  if (message.toLowerCase().indexOf('whats better') != -1 ||
      message.toLowerCase().indexOf('what\'s better') != -1 ||
      message.toLowerCase().indexOf('which is better') != -1) {
    var result = Math.random();
    var words = message.toLowerCase().split(' ');
    var orIndex = words.indexOf('or');
    // bad message format. return.
    if (orIndex == -1 || orIndex == 0 || orIndex == words.length - 1) {
      message = 'Ask me a real question.';
      bot.sendMessage({
        to: channelID,
        message
      });
      return;
    }

    var firstOption = words[orIndex - 1];
    var secondOption = words[orIndex + 1];
    if (firstOption != 'dragon' && firstOption != 'dragons' && secondOption != 'dragon' && secondOption != 'dragons') {
      // message didnt contain 'dragon' or 'dragons' as an option
      message = (Math.random() < .50 ? capitalize(stripPunch(firstOption)) : capitalize(stripPunc(secondOption))) + '. But dragons are better than both.';
      bot.sendMessage({
        to: channelID,
        message
      });
      return;
    }

    var otherOption = firstOption;
    message = 'Dragons.'
    if (firstOption == 'dragon' || firstOption == 'dragons')
      otherOption = capitalize(stripPunc(secondOption));

    if (result <= 0.03)
      message = otherOption + '.';

    bot.sendMessage({
      to: channelID,
      message
    });
  }
});

function messageContainsTrigger(triggers, message) {
  var words = stripPunc(message.toLowerCase()).split(' ');
  var result = false;
  words.forEach(word => {
    if (triggers.indexOf(word) != -1)
      result = true;
  });

  return result;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function stripPunc(string) {
  return string.replace(/[.',\/#!$%?\^&\*;:{}=\-_`~()]/g, '');
}
