# 平方和何时具有统计显著性？

!!! warning "注意"

    查看原文请点击[这里](/en/study-notes/experiment-design-and-statistical-analysis/01_ANOVA/02_LRT_and_Calibration/)

## 上节回顾

上一节中，我们从这样一个问题出发：

> 任务表现的变异从何而来？

对于平衡的双因素设计，最小二乘给出了如下拟合分解：

$$
y_{i,j,k}-\hat\mu
=
\hat{\alpha}_i
+
\hat{\beta}_j
+
\widehat{(\alpha\beta)}_{i,j}
+
\hat{\varepsilon}_{i,j,k}.
$$

把所有观测堆叠成向量后，同样的分解就变为

$$
\mathbf y-\hat{\boldsymbol\mu}
=
\hat{\boldsymbol\alpha}
+
\hat{\boldsymbol\beta}
+
\widehat{\boldsymbol{\alpha\beta}}
+
\hat{\boldsymbol{\varepsilon}}.
$$

由于设计是平衡的，这些拟合成分向量是相互正交的。因此，它们的平方长度可以相加：

$$
\mathrm{SS_T}
=
\mathrm{SS_A}
+
\mathrm{SS_B}
+
\mathrm{SS_{A\times B}}
+
\mathrm{SS_E}.
$$

这一分解告诉我们，在我们所观测到的数据集中，反馈、难度、交互以及残差误差各自关联了多少平方变异。

但仅有分解似乎还回答不了我们最初的问题。

一个直觉的做法，是把某个成分平方和与残差平方和进行比较。例如，对交互项，我们可以看

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}.
$$

如果交互成分相对于残差成分较大，那么这个比值就会较大。

但是，如果这个数等于或接近 1，是不是意味着交互效应不存在？而当它大于 1 时，是不是就意味着交互效应非零？

那么这个数小于 1 时又意味着什么？所谓“接近 1”又是接近到什么程度？

因此，我们需要一种有原则的方式，来界定我们用来判断比较结果的标准。

## 比较不同的模型

在此之前，我们先来看一下 $\mathrm{SS_{A\times B}}$ 究竟意味着什么：

从向量化的视角看，$\mathrm{SS_{A\times B}}$ 衡量的是中心化观测向量中有多少被它捕获。

我们之前直接比较 $\mathrm{SS_{A\times B}}$ 与 $\mathrm{SS_E}$（也即比较 $\widehat{\boldsymbol{\alpha\beta}}$ 与 $\hat{\boldsymbol{\varepsilon}}$ 的大小）的尝试似乎徒劳无功，所以我们必须换一种方式来处理同一个问题。这次让我们再看一遍最初提出的模型。我们把它称为完整模型，记作 $\mathcal{M}_{F}$：

$$
\mathcal{M}_{F}:
Y_{i,j,k}
=
\mu
+
{\alpha}_i
+
{\beta}_j
+
{(\alpha\beta)}_{i,j}
+
{\varepsilon}_{i,j,k}.
$$

拟合后的完整模型可以写作

$$
y_{i,j,k}
=
\hat\mu
+
\hat{\alpha}_i
+
\hat{\beta}_j
+
\widehat{(\alpha\beta)}_{i,j}
+
\hat{\varepsilon}_{i,j,k}.
$$

如果我们怀疑交互作用根本不存在，那么一开始就把交互项放进模型里又是为了什么？让模型去捕捉一个不存在的效应，可能只会让它去追逐随机波动（即对数据过拟合）。

让我们来看一看，如果把交互项去掉、把它推到残差误差里，会发生什么。

我们把去掉交互项之后得到的新模型称为缩减模型，记作 $\mathcal{M}_{R, \mathrm{A\times B}}$：

$$
\mathcal{M}_{R, \mathrm{A\times B}}:
Y_{i,j,k}
=
\mu
+
{\alpha}_i
+
{\beta}_j
+
{\varepsilon}_{i,j,k}.
$$

把这个缩减模型拟合到观测数据集后，我们可以写

$$
y_{i,j,k}
=
\hat{y}^{(\mathcal{M}_{R,\mathrm{A\times B}})}_{i,j,k}
+
\hat{\varepsilon}_{i,j,k}^{(\mathcal{M}_{R, \mathrm{A\times B}})},
$$

其中

$$
\hat{\varepsilon}_{i,j,k}^{(\mathcal{M}_{R, \mathrm{A\times B}})} = \hat{\varepsilon}_{i,j,k} + \widehat{(\alpha\beta)}_{i,j}.
$$

记 $\hat{\theta}^{(\mathcal M_{R,\mathrm{A\times B}})}$ 与 $\hat{\theta}^{(\mathcal M_F)}$ 分别为缩减模型与完整模型下的最小二乘估计。

由于 $\hat{\boldsymbol{\varepsilon}}\perp \widehat{\boldsymbol{\alpha\beta}}$，我们有

$$
\begin{aligned}
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_{R,\mathrm{A\times B}})};\mathcal M_{R,\mathrm{A\times B}})
&=
\left\|
\hat{\boldsymbol{\varepsilon}}
+
\widehat{\boldsymbol{\alpha\beta}}
\right\|^2 \\
&=
\|\hat{\boldsymbol{\varepsilon}}\|^2
+
\|\widehat{\boldsymbol{\alpha\beta}}\|^2 \\
&=
\mathrm{SS_E}
+
\mathrm{SS_{A\times B}}.
\end{aligned}
$$

与此同时，

$$
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_F)};\mathcal M_F)
=
\|\hat{\boldsymbol{\varepsilon}}\|^2
=
\mathrm{SS_E}.
$$

因此，

$$
\mathrm{SS_{A\times B}}
=
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_{R,\mathrm{A\times B}})};\mathcal M_{R,\mathrm{A\times B}})
-
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_F)};\mathcal M_F).
$$

由此可见，$\mathrm{SS_{A\times B}}$ 可以被视为：把交互成分纳入模型后所带来的 SSE 减少量。

从这个角度看，与其只是问

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
$$

依某个任意的标准看起来是大还是小，不如换一个问题：

完整模型对数据的拟合是否合理地优于其中一个缩减模型？

回答这个问题的一种方式来自似然。每个模型都会赋予观测数据一个概率密度。在似然意义上，赋予观测数据更高似然的模型可以说更好地拟合了数据。

## 似然比检验与校准

### 正态性假设

到目前为止，我们的分解操作完全是几何性的。

但从这一点开始，我们要追加一条假设：

$$
\varepsilon_{i,j,k}\overset{\mathrm{i.i.d}}{\sim}\mathcal{N}(0,\sigma^2).
$$

也就是说，假设残差误差是相互独立的、服从正态分布、以零为中心，并且在每个条件下都具有相同的方差。

!!! warning "分布假设"

    如果这一假设被严重违反，许多经典的正态理论工具（包括我们将在本节推导出的工具）可能就不再适用。

    在那种情况下，应当考虑替代方法，例如自助法（bootstrap）、数据变换、广义线性模型等。

### 极大似然估计

考虑我们这个例子实验的一个一般性模型 $\mathcal M$。

将模型 $\mathcal M$ 对观测位置 $(i,j,k)$ 预测的均值写作

$$
y^{(\mathcal M)}_{i,j,k}(\theta).
$$

在正态误差假设下，

$$
Y_{i,j,k}
=
y^{(\mathcal M)}_{i,j,k}(\theta)
+
\varepsilon_{i,j,k},
\qquad
\varepsilon_{i,j,k}\overset{\mathrm{i.i.d.}}{\sim}\mathcal N(0,\sigma^2).
$$

因此，

$$
Y_{i,j,k}\mid \mathcal M,\sigma^2
\sim
\mathcal N\left(
y^{(\mathcal M)}_{i,j,k}(\theta),
\sigma^2
\right).
$$

于是，整个数据集的似然为：

$$
L(\theta^{(\mathcal M)},\sigma^2;\mathbf y,\mathcal M)
=
\prod_{i,j,k}
\frac{1}{\sqrt{2\pi\sigma^2}}
\exp\left[
-
\frac{
\left(
y_{i,j,k}
-
y^{(\mathcal M)}_{i,j,k}(\theta)
\right)^2
}{
2\sigma^2
}
\right].
$$

两边取对数：

$$
\begin{aligned}
\ell(\theta^{(\mathcal M)},\sigma^2;\mathbf y,\mathcal M)
&=
-\frac{N}{2}\ln(2\pi)
-
\frac{N}{2}\ln(\sigma^2)
-
\frac{1}{2\sigma^2}
\sum_{i,j,k}
\left(
y_{i,j,k}
-
y^{(\mathcal M)}_{i,j,k}(\theta)
\right)^2.
\end{aligned}
$$

现在我们想找到使这个似然最大的参数值，并且要求满足两个约束：

$$
\theta^{(\mathcal M)}\in\Theta_{\mathcal M},
\qquad
\sigma^2>0.
$$

第一个约束的意思是，参数向量必须落在模型 $\mathcal M$ 所允许的参数空间中。例如，完整模型允许交互成分，而缩减模型不允许。

由前一节我们已经知道，如何通过最小化平方误差来拟合一个模型的均值结构。我们把模型 $\mathcal M$ 下的最小二乘估计记作

$$
\hat{\theta}^{(\mathcal M)}.
$$

拟合完模型 $\mathcal M$ 的均值结构后，对数似然变为

$$
\ell(\hat{\theta}^{(\mathcal M)},\sigma^2;\mathbf y,\mathcal M)
=
-\frac{N}{2}\ln(2\pi)
-
\frac{N}{2}\ln(\sigma^2)
-
\frac{\sum_{i,j,k}
\left(
y_{i,j,k}
-
y^{(\mathcal M)}_{i,j,k}(\hat{\theta}^{(\mathcal M)})
\right)^2}{2\sigma^2}.
$$

注意

$$
\mathrm{SSE}(\theta;\mathcal M)
=
\sum_{i,j,k}
\left(
y_{i,j,k}
-
y^{(\mathcal M)}_{i,j,k}(\theta)
\right)^2.
$$

因此，

$$
\ell(\hat{\theta}^{(\mathcal M)},\sigma^2;\mathbf y,\mathcal M)
=
-\frac{N}{2}\ln(2\pi)
-
\frac{N}{2}\ln(\sigma^2)
-
\frac{\mathrm{SSE}(\hat{\theta}^{(\mathcal M)};\mathcal M)}{2\sigma^2}.
$$

现在对 $\sigma^2$ 最大化这个表达式。对 $\sigma^2$ 求导：

$$
\frac{\partial \ell}{\partial \sigma^2}
=
-\frac{N}{2\sigma^2}
+
\frac{\mathrm{SSE}(\hat{\theta}^{(\mathcal M)};\mathcal M)}{2(\sigma^2)^2}.
$$

令导数等于零：

$$
-\frac{N}{2\sigma^2}
+
\frac{\mathrm{SSE}(\hat{\theta}^{(\mathcal M)};\mathcal M)}{2(\sigma^2)^2}
=
0.
$$

两边乘以 $2(\sigma^2)^2$：

$$
-N\sigma^2+\mathrm{SSE}(\hat{\theta}^{(\mathcal M)};\mathcal M)=0.
$$

因此，

$$
\widehat{\sigma^2}_{\mathcal M,\mathrm{MLE}}
=
\frac{\mathrm{SSE}(\hat{\theta}^{(\mathcal M)};\mathcal M)}{N}.
$$

把两个极大似然估计都代回似然，就得到模型 $\mathcal M$ 的最大化似然：

$$
\widehat L_{\mathcal M}
=
L(\hat{\theta}^{(\mathcal M)},\widehat{\sigma^2}_{\mathcal M,\mathrm{MLE}};\mathbf y,\mathcal M).
$$

利用前面的表达式，

$$
\begin{aligned}
\widehat L_{\mathcal M}
&=
(2\pi e)^{-N/2}
\left(
\frac{\mathrm{SSE}(\hat{\theta}^{(\mathcal M)};\mathcal M)}{N}
\right)^{-N/2}.
\end{aligned}
$$

可惜的是，单看一个似然值，本身仍很难解释。

似然在比较的语境下才最容易被理解。当我们比较两个似然值时，它才真正变得有用。

### 似然比检验

现在，我们想通过比较两个模型的最大化似然来比较缩减模型与完整模型：

$$
\begin{align*}
\Lambda_{\mathrm{A\times B}}
&=
\frac{
\widehat L_{\mathcal M_{R,\mathrm{A\times B}}}
}{
\widehat L_{\mathcal M_F}
}\\
&=\frac{(2\pi e)^{-\frac{N}{2}} \left( \frac{\mathrm{SSE}(\hat{\theta}^{(\mathcal M_{R,\mathrm{A\times B}})};\mathcal{M}_{R,\mathrm{A\times B}})}{N} \right)^{-\frac{N}{2}}}{(2\pi e)^{-\frac{N}{2}} \left( \frac{\mathrm{SSE}(\hat{\theta}^{(\mathcal M_F)};\mathcal M_F)}{N} \right)^{-\frac{N}{2}}}\\
&= \left(\frac{
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_{R,\mathrm{A\times B}})};\mathcal{M}_{R,\mathrm{A\times B}})
}{
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_F)};\mathcal{M}_F)
}\right)^{-\frac{N}{2}}
.
\end{align*}
$$

如果缩减模型的拟合几乎与完整模型一样好，那么

$$
\widehat L_{\mathcal M_{R,\mathrm{A\times B}}}
\approx
\widehat L_{\mathcal M_F},
$$

于是

$$
\Lambda_{\mathrm{A\times B}}\approx 1,
$$

这意味着去掉交互成分几乎不会带来似然损失。

但如果缩减模型的拟合远远差于完整模型，那么

$$
\widehat L_{\mathcal M_{R,\mathrm{A\times B}}}
\ll
\widehat L_{\mathcal M_F},
$$

且

$$
\Lambda_{\mathrm{A\times B}}\ll 1,
$$

这意味着去掉交互成分会带来很大的似然损失。

因此，对缩减模型不利的证据越强，对应的似然比就越小。

对 $\Lambda_{\mathrm{A\times B}}$ 取对数：

$$
\ln \Lambda_{\mathrm{A\times B}}
=
-\frac{N}{2}
\ln\left(
\frac{
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_{R,\mathrm{A\times B}})};\mathcal M_{R,\mathrm{A\times B}})
}{
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_F)};\mathcal M_F)
}
\right).
$$

因此，

$$
-2\ln \Lambda_{\mathrm{A\times B}}
=
N
\ln\left(
\frac{
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_{R,\mathrm{A\times B}})};\mathcal M_{R,\mathrm{A\times B}})
}{
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_F)};\mathcal M_F)
}
\right).
$$

由于乘以 $-2$ 后符号被翻转了，现在对缩减模型不利的证据越强，对应的 $-2\ln \Lambda_{\mathrm{A\times B}}$ 就越大。

回忆

$$
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_F)};\mathcal{M}_{F})=\|\hat{\boldsymbol{\varepsilon}}
\|^2=\mathrm{SS_E},
$$

以及

$$
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_{R,\mathrm{A\times B}})};\mathcal{M}_{R, \mathrm{A\times B}})=\|\hat{\boldsymbol{\varepsilon}}^{(\mathcal{M}_{R, \mathrm{A\times B}})}\|^2 =\mathrm{SS_E}
+
\mathrm{SS_{A\times B}}.
$$

因此，

$$
\frac{
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_{R,\mathrm{A\times B}})};\mathcal M_{R,\mathrm{A\times B}})
}{
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_F)};\mathcal M_F)
}=
1+\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
\geq 1.
$$

对数中的这个比值至少为 $1$。这个比值越是大于 $1$，去掉交互成分带来的残差误差增量就越大，我们的 $-2\ln \Lambda_{\mathrm{A\times B}}$ 统计量也就越大，提示对缩减模型不利的证据越强。

于是，

$$
-2\ln\Lambda_{\mathrm{A\times B}}
=
N\ln\left(
1+
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
\right).
$$

由于 $N>0$ 且 $\ln(1+x)$ 在 $x\geq 0$ 时严格递增，$-2\ln \Lambda_{\mathrm{A\times B}}$ 统计量是

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
$$

的严格单调递增函数。

因此，原始比值

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
$$

与 $-2\ln \Lambda_{\mathrm{A\times B}}$ 统计量在我们对缩减模型与完整模型的比较中是单调等价的。也就是说，它们对应同样方向的证据强度。

事实证明，我们最初的比值并非完全错误。它指向了正确的比较。

但是，$\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}$ 还不能被称作检验统计量。它告诉了我们证据的方向和大小排序，却没有给出“多大才算足够大”的参考标准。

### 自由度

借助似然，我们已经知道哪一种比较是重要的，以及为什么。但我们仍需要*校准*这一比较。

在此之前，我们先回到分解的几何上来。

$$
\mathbf{y}-\hat{\boldsymbol{\mu}}=\hat{\boldsymbol{\alpha}}+\hat{\boldsymbol{\beta}}+\widehat{\boldsymbol{\alpha\beta}}+\hat{\boldsymbol{\varepsilon}}.
$$

这里，每一个成分向量都被允许在某个子空间 $W$ 内移动。我们把这个子空间的维数 $\dim W$ 称为它的自由度。

回忆我们对模型施加的和为零约束：

$$
\sum_i \alpha_i = 0,
\qquad
\sum_j \beta_j = 0,
$$

以及

$$
\sum_i(\alpha\beta)_{i,j}=0
\quad\text{对每一个 }j,
\qquad
\sum_j(\alpha\beta)_{i,j}=0
\quad\text{对每一个 }i.
$$

这些约束实际上告诉了我们每个成分在多少个数值上可以自由变化。这个数就是它的自由度。

以交互成分为例。

交互项中每一个反馈 × 难度的单元都对应一个值：

$$
(\alpha\beta)_{i,j},
\qquad
i=1,\ldots,I,
\qquad
j=1,\ldots,J.
$$

乍一看，似乎有 $IJ$ 个数。但它们并不全是自由的，因为交互成分必须同时满足行和与列和的约束：

$$
\sum_i(\alpha\beta)_{i,j}=0
\quad\text{对每一个 }j,
$$

以及

$$
\sum_j(\alpha\beta)_{i,j}=0
\quad\text{对每一个 }i.
$$

数自由值的一种简单办法，是把交互表填出来。

首先在左上角的 $(I-1)\times(J-1)$ 块中自由地选取数值：

$$
(\alpha\beta)_{i,j},
\qquad
i=1,\ldots,I-1,
\qquad
j=1,\ldots,J-1.
$$

这样的数值共有

$$
(I-1)(J-1)
$$

个。

一旦选定了这些值，剩下的值就被和为零约束所确定。

对每一行 $i=1,\ldots,I-1$，最后一列的值必须使该行之和为零：

$$
(\alpha\beta)_{i,J}
=
-\sum_{j=1}^{J-1}(\alpha\beta)_{i,j}.
$$

对每一列 $j=1,\ldots,J-1$，最后一行的值必须使该列之和为零：

$$
(\alpha\beta)_{I,j}
=
-\sum_{i=1}^{I-1}(\alpha\beta)_{i,j}.
$$

最后，右下角的值也被强制确定。它必须同时满足最后一行的和与最后一列的和：

$$
(\alpha\beta)_{I,J}
=
-\sum_{j=1}^{J-1}(\alpha\beta)_{I,j}
=
-\sum_{i=1}^{I-1}(\alpha\beta)_{i,J}.
$$

因此，交互成分只有

$$
df_{\mathrm{A\times B}}
=
(I-1)(J-1)
$$

个自由值。

类似地，对反馈成分 $A$，有 $I$ 个反馈水平偏差：

$$
\alpha_1,\alpha_2,\ldots,\alpha_I.
$$

但它们必须满足

$$
\sum_i \alpha_i=0.
$$

所以一旦选定了 $I-1$ 个值，最后一个就被确定。因此，

$$
df_\mathrm{A}=I-1.
$$

同样的逻辑适用于难度成分 $B$。由于有 $J$ 个难度水平偏差和一个和为零约束，

$$
df_\mathrm{B}=J-1.
$$

对于残差成分 $E$，残差在每个单元内变化。在单元 $(i,j)$ 中有 $K$ 个残差：

$$
\varepsilon_{i,j,1},\varepsilon_{i,j,2},\ldots,\varepsilon_{i,j,K}.
$$

在完整模型中，单元 $(i,j)$ 中第 $k$ 个观测的拟合值为

$$
\hat y^{(\mathcal M_F)}_{i,j,k}
=
\hat\mu
+
\hat{\alpha}_i
+
\hat{\beta}_j
+
\widehat{(\alpha\beta)}_{i,j}.
$$

回忆这些定义：

$$
\hat{\alpha}_i
=
\bar y_{i,.,.}-\hat\mu,
$$

$$
\hat{\beta}_j
=
\bar y_{.,j,.}-\hat\mu,
$$

以及

$$
\widehat{(\alpha\beta)}_{i,j}
=
\bar y_{i,j,.}
-
\bar y_{i,.,.}
-
\bar y_{.,j,.}
+
\hat\mu.
$$

把这些代入拟合值得到

$$
\begin{aligned}
\hat y^{(\mathcal M_F)}_{i,j,k}
&=
\hat\mu
+
(\bar y_{i,.,.}-\hat\mu)
+
(\bar y_{.,j,.}-\hat\mu)
+
(\bar y_{i,j,.}-\bar y_{i,.,.}-\bar y_{.,j,.}+\hat\mu) \\
&=
\bar y_{i,j,.}.
\end{aligned}
$$

所以在完整模型中，单元 $(i,j)$ 内每一个观测都得到相同的拟合值：

$$
\hat y^{(\mathcal M_F)}_{i,j,k}
=
\bar y_{i,j,.}.
$$

因此，单元 $(i,j)$ 中第 $k$ 个观测的残差为

$$
\hat{\varepsilon}_{i,j,k}
=
y_{i,j,k}
-
\bar y_{i,j,.}.
$$

现在把同一个单元内的残差求和：

$$
\begin{aligned}
\sum_k \hat{\varepsilon}_{i,j,k}
&=
\sum_k
\left(
y_{i,j,k}
-
\bar y_{i,j,.}
\right) \\
&=
\sum_k y_{i,j,k}
-
\sum_k \bar y_{i,j,.} \\
&=
\sum_k y_{i,j,k}
-
K\bar y_{i,j,.}.
\end{aligned}
$$

而由定义，

$$
\bar y_{i,j,.}
=
\frac{1}{K}
\sum_k y_{i,j,k}.
$$

所以

$$
K\bar y_{i,j,.}
=
\sum_k y_{i,j,k}.
$$

因此，

$$
\sum_k \hat{\varepsilon}_{i,j,k}
=
0.
$$

这样，在每个单元内，$K$ 个残差并不全是自由的。一旦已知 $K-1$ 个残差，最后一个就被强制确定，使得该单元的残差之和等于零。

因此，每个单元贡献 $K-1$ 个残差自由度。由于有 $IJ$ 个单元，

$$
df_{\mathrm{E}}=IJ(K-1).
$$

最后，对于总的中心化数据向量

$$
\mathbf y-\hat{\boldsymbol\mu},
$$

共有 $N=IJK$ 个观测，但用总均值进行中心化施加了一个约束：

$$
\sum_{i,j,k}(y_{i,j,k}-\hat\mu)=0.
$$

因此，

$$
df_T=N-1=IJK-1.
$$

在本章中，自由度的含义是：在模型约束被施加之后，某个成分还能自由变化的独立方向数目。

在后续讨论线性模型几何的章节中，我们将用投影子空间及其维数来重新表述同一个想法。

### 校准

现在我们已经知道两件事。首先，我们对似然比的推导表明，原始比值

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
$$

指向的方向是正确的。这一比值越大，对应的对缩减模型不利的似然比证据越强。

其次，我们对自由度的推导表明，原始比值的分子与分母来自维数不同的空间：

$$
df_{\mathrm{A\times B}}=(I-1)(J-1),
\qquad
df_{\mathrm{E}}=IJ(K-1).
$$

在两个方向上累积的平方长度，不应直接与在五十四个方向上累积的平方长度相比较。所以从直觉上讲，这个比值应该比较的是*每个可用方向上的平方长度*：

$$
\frac{
\mathrm{SS_{A\times B}}/df_{\mathrm{A\times B}}
}{
\mathrm{SS_E}/df_{\mathrm E}
}.
$$

这就是原始比较经过维度调整后的版本。

分子衡量的是交互成分*每个交互自由度*所捕获的平方变异；分母衡量的是*每个残差自由度*下作为残差误差的平方变异。

如果缩减模型已经足够，那么拟合出来的交互成分只是在拟合随机误差。在这种情形下，分子与分母应当差不多。如果分子远大于分母，那么交互成分捕获的每个方向的变异就比仅有残差噪声所能预期的要多。

但即使有了这个经过调整的形式，它仍不是最终的对象。我们还没有为它建立参考分布。因此，它还无法告诉我们：在缩减模型下，什么样的取值才算寻常、什么样才算异常。

这就是*校准*登场的地方。

校准试图回答以下问题：

> 如果我们的缩减模型为真，这种比较的取值有哪些是寻常的？

它通过为统计量构造一个参考标准来做到这一点，也就是借助一个名为**枢轴量**（pivot）的东西，在缩减模型下构造参考分布。

枢轴量是一个统计量，它在零假设下的分布是已知的，并且不依赖于未知参数。

从这里开始，我们把估计量看作随机向量 $\mathbf{Y}$ 的函数，而不是观测向量 $\mathbf{y}$ 的函数。因此，像 $\widehat{\boldsymbol{\alpha\beta}}$ 和 $\mathrm{SS_{A\times B}}$ 这样的量现在是随机变量，尽管一旦数据被收集到，它们的观测实现值就是固定的数。

回忆我们的正态误差假设：

$$
\varepsilon_{i,j,k}\overset{\mathrm{i.i.d.}}{\sim}\mathcal N(0,\sigma^2).
$$

等价地，可以写作

$$
\varepsilon_{i,j,k}
=
\sigma z_{i,j,k},
\qquad
z_{i,j,k}\overset{\mathrm{i.i.d.}}{\sim}\mathcal N(0,1).
$$

因此整个误差向量可以写作

$$
\boldsymbol\varepsilon
=
\sigma \mathbf z,
\qquad
\mathbf z\sim \mathcal N(\mathbf 0,I).
$$

在零假设

$$
H_0^{A\times B}:(\alpha\beta)_{i,j}=0
\quad\text{对所有 }i,j
$$

下，拟合的交互成分是误差向量到交互子空间上的投影。把这个投影记作 $P_{\mathrm{A\times B}}\boldsymbol\varepsilon$。则

$$
\widehat{\boldsymbol{\alpha\beta}}
=
P_{\mathrm{A\times B}}\boldsymbol\varepsilon
=
P_{\mathrm{A\times B}}(\sigma\mathbf z)
=
\sigma P_{\mathrm{A\times B}}\mathbf z.
$$

因此，

$$
\mathrm{SS_{A\times B}}
=
\left\|
\widehat{\boldsymbol{\alpha\beta}}
\right\|^2
=
\left\|
\sigma P_{\mathrm{A\times B}}\mathbf z
\right\|^2
=
\sigma^2
\left\|
P_{\mathrm{A\times B}}\mathbf z
\right\|^2.
$$

类似地，若 $P_{\mathrm{E}}$ 是到残差子空间的投影，则

$$
\hat{\boldsymbol{\varepsilon}}
=
P_{\mathrm{E}}\boldsymbol\varepsilon
=
\sigma P_{\mathrm{E}}\mathbf z,
$$

因此

$$
\mathrm{SS_E}
=
\left\|
\hat{\boldsymbol{\varepsilon}}
\right\|^2
=
\sigma^2
\left\|
P_{\mathrm{E}}\mathbf z
\right\|^2.
$$

由此可见，$\mathrm{SS_{A\times B}}$ 和 $\mathrm{SS_E}$ 都是在 $\sigma^2$ 的尺度上度量的。如果残差噪声更大，这两个平方和都会倾向于变大。

所以，一个有用的、被校准过的统计量应当把这个未知的尺度去掉。

此外，我们还需要知道这些被投影的平方长度的分布。

要做到这两点，我们将使用一个经典结果，叫做 **Cochran 定理**（Cochran's theorem）。

这里使用的是它的一个简化版本。完整版本通常用二次型与投影矩阵来表述。[^cochran1934] 我们将在后续章节中对其作更深入的讨论。

!!! info "Cochran 定理（简化版）"

    若一个正态误差向量被分解为相互正交的若干成分，则这些成分的平方长度，在除以 $\sigma^2$ 之后，服从相互独立的 $\chi^2$ 分布。

    每个 $\chi^2$ 分布的自由度等于对应成分子空间的维数。


根据上面的投影表示，

$$
\frac{\mathrm{SS_{A\times B}}}{\sigma^2}
=
\left\|
P_{\mathrm{A\times B}}\mathbf z
\right\|^2.
$$

Cochran 定理给出

$$
\frac{\mathrm{SS_{A\times B}}}{\sigma^2}
=
\left\|
P_{\mathrm{A\times B}}\mathbf z
\right\|^2
\sim
\chi^2_{df_{\mathrm{A\times B}}}.
$$

类似地，对残差成分：

$$
\frac{\mathrm{SS_E}}{\sigma^2}
=
\left\|
P_{\mathrm{E}}\mathbf z
\right\|^2
\sim
\chi^2_{df_{\mathrm{E}}}.
$$

由于交互子空间与残差子空间是正交的，Cochran 定理还保证这两个 $\chi^2$ 变量是相互独立的。

Cochran 定理也让我们之前的直觉变得精确：

如果

$$
\frac{\mathrm{SS_{A\times B}}}{\sigma^2}
\sim
\chi^2_{df_{\mathrm{A\times B}}},
$$

那么，由于服从自由度为 $d$ 的 $\chi^2$ 分布的随机变量的期望为 $d$，

$$
\mathbb{E}\left[
\frac{\mathrm{SS_{A\times B}}}{\sigma^2}
\right]
=
df_{\mathrm{A\times B}}.
$$

两边同乘 $\sigma^2$：

$$
\mathbb{E}\left[
\mathrm{SS_{A\times B}}
\right]
=
df_{\mathrm{A\times B}}\sigma^2.
$$

因此，

$$
\mathbb{E}\left[
\frac{\mathrm{SS_{A\times B}}}{df_{\mathrm{A\times B}}}
\right]
=
\sigma^2.
$$

类似地，

$$
\mathbb{E}\left[
\frac{\mathrm{SS_E}}{df_{\mathrm E}}
\right]
=
\sigma^2.
$$

所以在零假设下，这两个维度调整后的平方长度都是同一个方差 $\sigma^2$ 的无偏估计量，因而是可比的。

现在回忆 $F$ 分布的定义。

如果

$$
U\sim \chi^2_{d_1},
\qquad
V\sim \chi^2_{d_2},
$$

且 $U$ 与 $V$ 独立，那么

$$
\frac{U/d_1}{V/d_2}
\sim
F_{d_1,d_2}.
$$

因此，

$$
\frac{
\left(\mathrm{SS_{A\times B}}/\sigma^2\right)/df_{\mathrm{A\times B}}
}{
\left(\mathrm{SS_E}/\sigma^2\right)/df_{\mathrm{E}}
}
\sim
F_{df_{\mathrm{A\times B}},df_{\mathrm{E}}}.
$$

未知的 $\sigma^2$ 被消去，得到

$$
F_\mathrm{{A\times B}}
=
\frac{
\mathrm{SS_{A\times B}}/df_{\mathrm{A\times B}}
}{
\mathrm{SS_E}/df_{\mathrm{E}}
}
\sim
F_{df_{\mathrm{A\times B}},df_{\mathrm{E}}}.
$$

至此，校准步骤就完成了。

$F_\mathrm{{A\times B}}$ 正是我们所要找的枢轴量。在没有交互的零假设下，它的分布是已知的，且不依赖于未知参数。

## 双因素方差分析

我们终于可以为推导出来的这个程序命名了。

我们从一个平衡的双因素设计出发，把中心化数据向量分解为反馈、难度、交互、残差四个成分；用似然来识别出相关的“缩减 vs 完整”的比较；再通过自由度加 Cochran 定理对这一比较进行校准。

这个程序就是经典的**双因素方差分析**（two-way ANOVA）。

在这个平衡设计下，对其他拟合成分应用同样的模型比较和校准逻辑可以得到：

$$
F_\mathrm{A}
=
\frac{\mathrm{SS_A}/df_\mathrm{A}}{\mathrm{SS_E}/df_\mathrm{E}},
$$

$$
F_\mathrm{B}
=
\frac{\mathrm{SS_B}/df_\mathrm{B}}{\mathrm{SS_E}/df_\mathrm{E}},
$$

以及

$$
F_\mathrm{{A\times B}}
=
\frac{\mathrm{SS_{A\times B}}/df_{\mathrm{A\times B}}}{\mathrm{SS_E}/df_{\mathrm{E}}}.
$$

在对应的零假设

$$
H_0^\mathrm{A}:\alpha_i=0\quad\text{对所有 }i,
$$

$$
H_0^\mathrm{B}:\beta_j=0\quad\text{对所有 }j,
$$

以及

$$
H_0^\mathrm{{A\times B}}:(\alpha\beta)_{i,j}=0\quad\text{对所有 }i,j
$$

之下，这些统计量分别服从对应的 $F$ 分布：

$$
F_\mathrm{A}\sim F_{df_\mathrm{A},df_{\mathrm{E}}},
$$

$$
F_\mathrm{B}\sim F_{df_\mathrm{B},df_{\mathrm{E}}},
$$

以及

$$
F_\mathrm{{A\times B}}\sim F_{df_{\mathrm{A\times B}},df_{\mathrm{E}}}.
$$

### 方差分析表

人们常用一个叫做“方差分析表”（ANOVA table）的表格来组织上面推导出的各种量。

| 变异来源 | 平方和 | 自由度 | 均方 | F |
|---|---:|---:|---:|---:|
| 反馈 $\mathrm{A}$ | $\mathrm{SS_A}$ | $I-1$ | $\mathrm{SS_A}/df_\mathrm{A}$ | $\mathrm{MS_A}/\mathrm{MS_E}$ |
| 难度 $\mathrm{B}$ | $\mathrm{SS_B}$ | $J-1$ | $\mathrm{SS_B}/df_\mathrm{B}$ | $\mathrm{MS_B}/\mathrm{MS_E}$ |
| 交互 $\mathrm{A\times B}$ | $\mathrm{SS_{A\times B}}$ | $(I-1)(J-1)$ | $\mathrm{SS_{A\times B}}/df_\mathrm{{A\times B}}$ | $\mathrm{MS_{A\times B}}/\mathrm{MS_E}$ |
| 误差 | $\mathrm{SS_E}$ | $IJ(K-1)$ | $\mathrm{SS_E}/df_\mathrm{E}$ | |
| 总和 | $\mathrm{SS_T}$ | $IJK-1$ | | |

这里，

$$
\mathrm{MS}
=
\frac{\mathrm{SS}}{df}
$$


表示**均方**（mean square），即每个自由度上的平方长度。

### 实例的方差分析结果

对于上一节中反馈 × 难度的例子，我们有

$$
I=3,\qquad J=2,\qquad K=10,\qquad N=60.
$$

数值计算后的双因素方差分析表为：

| 变异来源 | 平方和 | 自由度 | 均方 | F | p |
|---|---:|---:|---:|---:|---:|
| 反馈 $\mathrm{A}$ | $333.33$ | $2$ | $166.67$ | $89.59$ | $7.03\times 10^{-18}$ |
| 难度 $\mathrm{B}$ | $201.67$ | $1$ | $201.67$ | $108.40$ | $1.61\times 10^{-14}$ |
| 交互 $\mathrm{A\times B}$ | $6603.33$ | $2$ | $3301.67$ | 1774.74 | $5.54\times 10^{-50}$ |
| 误差 | $100.46$ | $54$ | $1.86$ | | |
| 总和 | $7238.79$ | $59$ | | | |

由此可知，对这份数据而言，反馈类型、任务难度，尤其是它们之间的交互作用，所解释的变异都远远超过在对应零假设下仅由残差变异所能预期的量。

!!! note

    例子中的数据值是出于演示目的由计算机生成的。现实中反馈范式所产生的效应远比这要小。


??? info "点击展开使用括号记法的手工计算"

    各单元的总分如下：

    | 反馈类型 | $B_1$ 简单的 $T_{i,1,.}$ | $B_2$ 困难的 $T_{i,2,.}$ | $T_{i,.,.}$ |
    |---|---:|---:|---:|
    | $A_1$ 鼓励型 | 50 | 250 | 300 |
    | $A_2$ 中性 | 100 | 100 | 200 |
    | $A_3$ 批评型 | 255 | -55 | 200 |
    | $T_{.,j,.}$ | 405 | 295 | $T_{.,.,.}=700$ |

    首先计算校正项：

    $$
    C
    =
    \frac{T_{.,.,.}^2}{IJK}
    =
    \frac{700^2}{3\cdot 2\cdot 10}
    =
    8166.67.
    $$

    观测值的平方和为

    $$
    \sum_{i,j,k}y_{i,j,k}^2=15405.46.
    $$

    因此，

    $$
    \mathrm{SS_T}
    =
    \sum_{i,j,k}y_{i,j,k}^2-C
    =
    15405.46-8166.67
    =
    7238.79.
    $$

    对反馈类型 $A$，

    $$
    \begin{aligned}
    \mathrm{SS_A}
    &=
    \sum_i\frac{T_{i,.,.}^2}{JK}-C \\
    &=
    \frac{300^2+200^2+200^2}{2\cdot 10}
    -
    8166.67 \\
    &=
    333.33.
    \end{aligned}
    $$

    对任务难度 $B$，

    $$
    \begin{aligned}
    \mathrm{SS_B}
    &=
    \sum_j\frac{T_{.,j,.}^2}{IK}-C \\
    &=
    \frac{405^2+295^2}{3\cdot 10}
    -
    8166.67 \\
    &=
    201.67.
    \end{aligned}
    $$

    单元平方和为

    $$
    \begin{aligned}
    \mathrm{SS_{cell}}
    &=
    \sum_{i,j}\frac{T_{i,j,.}^2}{K}-C \\
    &=
    \frac{
    50^2+250^2+100^2+100^2+255^2+(-55)^2
    }{10}
    -
    8166.67 \\
    &=
    7138.33.
    \end{aligned}
    $$

    因此，

    $$
    \begin{aligned}
    \mathrm{SS_{A\times B}}
    &=
    \mathrm{SS_{cell}}-\mathrm{SS_A}-\mathrm{SS_B} \\
    &=
    7138.33-333.33-201.67 \\
    &=
    6603.33.
    \end{aligned}
    $$

    最后，

    $$
    \begin{aligned}
    \mathrm{SS_E}
    &=
    \mathrm{SS_T}
    -
    \mathrm{SS_A}
    -
    \mathrm{SS_B}
    -
    \mathrm{SS_{A\times B}} \\
    &=
    7238.79-333.33-201.67-6603.33 \\
    &=
    100.46.
    \end{aligned}
    $$

    各项自由度为：

    $$
    df_A=I-1=2,
    \qquad
    df_B=J-1=1,
    $$

    $$
    df_{A\times B}=(I-1)(J-1)=2,
    \qquad
    df_E=IJ(K-1)=54,
    $$

    以及

    $$
    df_T=IJK-1=59.
    $$

    因此，

    $$
    \mathrm{MS_A}=\frac{333.33}{2}=166.67,
    \qquad
    \mathrm{MS_B}=\frac{201.67}{1}=201.67,
    $$

    $$
    \mathrm{MS_{A\times B}}=\frac{6603.33}{2}=3301.67,
    \qquad
    \mathrm{MS_E}=\frac{100.46}{54}=1.86.
    $$

    校准后的 $F$ 统计量为：

    $$
    F_A=\frac{166.67}{1.86}=89.59,
    $$

    $$
    F_B=\frac{201.67}{1.86}=108.40,
    $$

    以及

    $$
    F_{A\times B}=\frac{3301.67}{1.86}=1774.74.
    $$

## 本节小结

在本节中，我们追问：一个平方和何时应当被视为在统计上有意义的？

我们首先看到，像

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
$$

这样的原始比较并不能为解释提供标准。

为了让比较更具原则性，我们把问题重新表述为缩减模型与完整模型之间的比较。对交互项，我们证明了

$$
\mathrm{SS_{A\times B}}
=
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_{R,\mathrm{A\times B}})};\mathcal M_{R,\mathrm{A\times B}})
-
\mathrm{SSE}(\hat{\theta}^{(\mathcal M_F)};\mathcal M_F).
$$

因此，交互平方和可以被解释为：把交互成分纳入模型后，残差平方误差所减少的量。

在正态误差假设下，似然比检验表明，这一比较与最大化似然相联系：

$$
-2\ln\Lambda_{\mathrm{A\times B}}
=
N\ln\left(
1+
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
\right).
$$

所以，原始比值并不是完全任意的。它与该“缩减 vs 完整”比较的似然比证据是单调等价的。

但仅有似然的排序还不够。我们还需要一个参考分布。自由度告诉我们每个成分能够自由变化的独立方向数目，而 Cochran 定理则给出了有限样本下的校准：

$$
F_{\mathrm{A\times B}}
=
\frac{
\mathrm{SS_{A\times B}}/df_{\mathrm{A\times B}}
}{
\mathrm{SS_E}/df_{\mathrm E}
}
\sim
F_{df_{\mathrm{A\times B}},df_{\mathrm E}}
$$

在没有交互的零假设之下成立。

把同样的逻辑应用到所有拟合成分上，就得到了经典的平衡双因素方差分析。

下一节我们将从方差分析表的构造，转向追问表中的结果对实验本身究竟意味着什么。综合 $F$ 检验只告诉我们某个拟合成分大到无法当作残差波动来处理，但它并不会自动告诉我们实验所讲述的故事。

因此我们将讨论如何解释主效应与交互作用，以及如何借助后续比较，比如简单主效应、事后比较和交互对比等，把数值表与实验设计重新连接起来。


[^cochran1934]: William G. Cochran, "The Distribution of Quadratic Forms in a Normal System, with Applications to the Analysis of Covariance", *Mathematical Proceedings of the Cambridge Philosophical Society* 30, no. 2 (1934): 178–191.
