# <img src="https://swiftlystatic.vercel.app/airacloud/favicon.svg" height="30px" width="30px"> AiraCloud Versioning

### <img src="https://swiftlystatic.vercel.app/airacloud/icon?icon=help-circle&fill=whitesmoke&regular=true" height="25px" width="25px"> What is versioning?

> Versioning refers to keeping track of each version of AiraCloud as we update the code to make changes, fix bugs, etc... It's useful as it helps identify _when_ and _where_ a mistake was made whenever a bug happens.
> This guide will help you log AiraCloud changes onto our changelog

### <img src="https://swiftlystatic.vercel.app/airacloud/icon?icon=checkmark-circle&fill=whitesmoke&regular=true" height="25px" width="25px"> Logging a new version

> Each AiraCloud version looks like this: `A`.`B`.`C`

> Get the current version number, imagine it's 6.7.13
> If you made an update to **fix an error, bug, or similar** or to **add functionality** or to **make an improvement** -> Add 1 to the `C` (6.7.**14**)
> If you made an update that makes **significant** changes -> Add 1 to the `B` and reset `C` (6.**8**.0)
> If you just made a new AiraCloud -> Add 1 to the `A` and reset `B` and `C` (**7**)

> Basically, most of the time you will be just bumping `C`.

> Also, remember to group commits - this means, if you made a commit that adds _only one thing_ to settings (for example), don't make a new version, keep committing until you have something that's actually good enough to make a new version.

> As an extra you can add labels
>
> `A`.`B`.`C`-`ALPHA` -> `A`.`B`.`C`-`BETA` -> `A`.`B`.`C`-`RC`
>
> **How to use labels**
>
> - ALPHA: First version of an update (not tested yet, can (and probably will) ship with known bugs).
> - BETA: When you keep making updates to the update you are working on (bug fixes, changes, etc...).
> - RC (shorthand for Release Candidate): A _beta_ that you start to roll out to the end users, having or not known bugs, so you can test it with the real users to find the final bugs.
>
> Basically, when you make something and inmediatly start rolling out a non-tested version, it's an alpha. Then, when you get to a point where it's half decent for the small user base, you switch to Beta, which is for a larger user base. If everything goes well, you make a RC, a testing version for everyone. Stable would be the following, it's represented with no label at all.
>
> Labels should be used when you are working on a big update (A. or B.) that will require of many commits to be finished.
