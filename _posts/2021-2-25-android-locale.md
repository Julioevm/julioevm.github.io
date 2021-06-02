---
layout: posts
title: "Changing Android 10 or higher device Locale programatically"
excerpt: "While testing your app, its common that you want to test it under different locales as part of your automation strategy. Lets see how to do it."
date: 2021-2-25 09:00:00 -0500
---


While testing your app, its common that you want to test it under different locales as part of your automation strategy. 

Be it on real devices or emulators this used to be quite simple to do *before Android API 29*

Simply running this adb command would let you change the locale easily:

```
adb shell am broadcast -a com.android.intent.action.SET_LOCALE --es com.android.intent.extra.LOCALE en_US com.android.customlocale2
```

The reason this worked, is because emulators were shipped with the **CustomLocale** app, which could be sent the previous command and it would set the desired locale for you. But this app is ***no longer provided*** and is incompatible with Android versions past 8.

After spending hours looking everywhere, I couldn't find a similar solution, but it seems that [Appium](http://appium.io/) manages to change the device locale.

## How does Appium do it?

We don't use Appium as part of our automation strategy, we use Calabash, which certainly has fallen behind in features, but we don't want to change the whole infrastructure right now. So the question was, *how does Appium achieve this?* And *can we benefit from it?*

They use [Appium Settings](https://github.com/appium/io.appium.settings) for this end. This app, like Custom Locale used to do, lets you directly interact with certain system settings, like enabling / disabling wifi, reading received notifications, or **changing the device locale**. 

So then all you need to do is install Appium Settings in the device under test and run these adb commands:

First we enable changing system settings though Appium Settings

```
adb shell pm grant io.appium.settings android.permission.CHANGE_CONFIGURATION
```

Then we can change the desired country and language

```
adb shell am broadcast -a io.appium.settings.locale -n io.appium.settings/.receivers.LocaleSettingReceiver --es lang en --es country US
```



You can install the app in every test or a more optimal way could be, if you use docker, to perform this when you create your emulator docker images so they already come installed with Appium Settings.
