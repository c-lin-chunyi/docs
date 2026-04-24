
## Whereas recognition of the inherent dignity

No one shall be subjected to arbitrary arrest, detention or exile.

Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.

No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.

Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.

Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.

Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.

鉴于对人类家庭所有成员的固有尊严及其平等的和不移的权利的承认,乃是世界自由、正义与和平的基础,

鉴于对人权的无视和侮蔑已发展为野蛮暴行,这些暴行玷污了人类的良心,而一个人人享有言论和信仰自由并免予恐惧和匮乏的世界的来临,已被宣布为普通人民的最高愿望,

鉴于为使人类不致迫不得已铤而走险对暴政和压迫进行反叛,有必要使人权受法治的保护,

鉴于有必要促进各国间友好关系的发展,

鉴于各联合国国家的人民已在联合国宪章中重申他们对基本人权、人格尊严和价值以及男女平等权利的信念,并决心促成较大自由中的社会进步和生活水平的改善,

鉴于各会员国业已誓愿同联合国合作以促进对人权和基本自由的普遍尊重和遵行,

鉴于对这些权利和自由的普遍了解对于这个誓愿的充分实现具有很大的重要性,

因此现在,大会,发布这一世界人权宣言,作为所有人民和所有国家努力实现的共同标准,以期每一个人和社会机构经常铭念本宣言,努力通过教诲和教育促进对权利和自由的尊重,并通过国家的和国际的渐进措施,使这些权利和自由在各会员国本身人民及在其管辖下领土的人民中得到普遍和有效的承认和遵行;

人人生而自由,在尊严和权利上一律平等。他们赋有理性和良心,并应以兄弟关系的精神相对待。

人人有资格享有本宣言所载的一切权利和自由,不分种族、肤色、性别、语言、宗教、政治或其他见解、国籍或社会出身、财产、出生或其他身分等任何区别。

并且不得因一人所属的国家或领土的政治的、行政的或者国际的地位之不同而有所区别,无论该领土是独立领土、托管领土、非自治领土或者处于其他任何主权受限制的情况之下。

The default math mode font is $Math\ Italic$. This should not be
confused with ordinary *Text Italic* -- notice the different spacing\,!
`\mathbf` produces bold roman letters: $\mathbf{abcABC}$.
If you wish to embolden complete formulas,
use the `\boldmath` command *before* going into math mode.  
This changes the default math fonts to bold.

| Command | Example |
|---|---|
| `normal` | $x = 2\pi \Rightarrow x \simeq 6.28$ |
| `mathbf` | $\mathbf{x} = 2\pi \Rightarrow \mathbf{x} \simeq 6.28$ |
| `boldmath` | $x = \mathbf{2}\pi \Rightarrow x \simeq{\mathbf{6.28}}$ |

Greek is available in upper and lower case:
$\alpha,\beta \dots \Omega$, and there are special
symbols such as $\hbar$.

Digits in formulas $1, 2, 3\dots$ may differ from those in text: 1, 2, 3\dots

There is a calligraphic alphabet `\mathcal` for upper case letters
$\mathcal{ABCDE}\dots$.

This font has both lining figures (13589, default) and oldstyle figures
($\oldstylenums{13589}$, select with `\oldstylenums{..}`).

**there is also a condensed weight** `\fontseries{c}\selectfont`

$$
\phi(t)=\frac{1}{\sqrt{2\pi}}
\int^t_0 e^{-x^2/2} dx
$$

$$
\prod_{j\geq 0}
\left(\sum_{k\geq 0}a_{jk} z^k\right)
= \sum_{k\geq 0} z^n
\left(
  \sum_{\substack{k_0,k_1,\ldots\geq 0\\
  k_0+k_1+\ldots=n}}
  a_{0k_0}a_{1k_1}\ldots
\right)
$$

$$
\pi(n) = \sum_{m=2}^{n}
\left\lfloor
  \left(
    \sum_{k=1}^{m-1}
    \left\lfloor
      \frac{(m/k)}{\lceil m/k\rceil}
    \right\rfloor
  \right)^{-1}
\right\rfloor
$$

$$
\left\{
\underbrace{
  \overbrace{\mathstrut a,\ldots,a}^{k\ a's},
  \overbrace{\mathstrut b,\ldots,b}^{l\ b's}
}_{k+1\ \mathrm{elements}}
\right\}
$$

$$
\mbox{W}^+
\begin{array}{l}
\nearrow\raise5pt\hbox{$\mu^+ + \nu_{\mu}$}\\
\rightarrow \pi^+ +\pi^0 \\[5pt]
\rightarrow \kappa^+ +\pi^0 \\
\searrow\lower5pt\hbox{$\mathrm{e}^+ +\nu_{\scriptstyle\mathrm{e}}$}
\end{array}
$$

$$
\frac{\pm
\left|\begin{array}{ccc}
x_1-x_2  & y_1-y_2 & z_1-z_2 \\
l_1      & m_1     & n_1     \\
l_2      & m_2     & n_2
\end{array}\right|}{
\sqrt{
\left|\begin{array}{cc}
l_1&m_1\\
l_2&m_2
\end{array}\right|^2
+
\left|\begin{array}{cc}
m_1&n_1\\
n_1&l_1
\end{array}\right|^2
+
\left|\begin{array}{cc}
m_2&n_2\\
n_2&l_2
\end{array}\right|^2
}}
$$

text accents: à, á, ä, â
may differ from math accents:

$$
\mbox{ acute=}\acute{a}
\quad
\mbox{ grave=}\grave{a}
\quad
\mbox{ ddot=}\ddot {a}
\quad
\mbox{ tilde=}\tilde{a}
\quad
\mbox{ bar=}\bar  {a}
\quad
\mbox{ breve=}\breve{a}
\quad
\mbox{ check=}\check{a}
\quad
\mbox{ hat=}\hat  {a}
\quad
\mbox{ vec=}\vec  {a}
\quad
\mbox{ dot=}\dot  {a}
$$

dotlessi=ı  
dotlessj=ȷ  
dagger=$\dagger$  
`\bm{x}` $\bm{x}$

$$1+1=2$$

$$E=mc^2$$