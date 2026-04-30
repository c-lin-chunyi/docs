# 引言：分解一个观测值

!!! warning "注意"
    
    查看原文请点击[这里](/en/study-notes/experiment-design-and-statistical-analysis/01_ANOVA/01_Introduction/)

## 一个例子

### 实验设计与原始数据

我们想研究反馈类型（$A_1$ 鼓励型、$A_2$ 中性、$A_3$ 批评型）和任务难度（$B_1$ 简单、$B_2$ 困难）如何影响被试的任务表现。

被试先完成一个基线任务，然后接受三种反馈类型 $A_i \;(i\in\{1,2,3\})$ 中的一种。之后他们再完成一个难度为 $B_j \; (j\in\{1,2\})$ 的任务。

因变量 $y$ 是被试反馈后的任务表现减去基线任务表现，两者都用准确率和用时来衡量。

$$
y=\text{反馈后表现}-\text{基线表现}.
$$

为简化讨论，本例假设准确率与用时已被合成一个标准化的成绩分数，分值越大表示提升越多。

每个反馈 × 难度组合下安排 10 名被试。

结果如下。

??? info "点击展开结果表"
    <table>
        <thead>
        <tr>
            <th rowspan="2">重复编号</th>
            <th colspan="3">B<sub>1</sub>（简单）</th>
            <th colspan="3">B<sub>2</sub>（困难）</th>
        </tr>
        <tr>
            <th>A<sub>1</sub>（鼓励型）</th>
            <th>A<sub>2</sub>（中性）</th>
            <th>A<sub>3</sub>（批评型）</th>
            <th>A<sub>1</sub>（鼓励型）</th>
            <th>A<sub>2</sub>（中性）</th>
            <th>A<sub>3</sub>（批评型）</th>
        </tr>
        </thead>
    <tbody>
        <tr><td>1</td><td>3.2</td><td>8.5</td><td>24.5</td><td>23.5</td><td>9.5</td><td>-4.5</td></tr>
        <tr><td>2</td><td>5.1</td><td>11.2</td><td>26.2</td><td>26.1</td><td>8.2</td><td>-6.2</td></tr>
        <tr><td>3</td><td>4.8</td><td>9.8</td><td>25.8</td><td>24.8</td><td>11.8</td><td>-5.8</td></tr>
        <tr><td>4</td><td>6.5</td><td>12.1</td><td>27.1</td><td>27.2</td><td>7.1</td><td>-7.1</td></tr>
        <tr><td>5</td><td>2.9</td><td>7.9</td><td>23.9</td><td>22.9</td><td>12.9</td><td>-3.9</td></tr>
        <tr><td>6</td><td>5.0</td><td>10.5</td><td>25.5</td><td>25.5</td><td>10.5</td><td>-5.5</td></tr>
        <tr><td>7</td><td>6.2</td><td>11.8</td><td>26.8</td><td>26.8</td><td>9.2</td><td>-6.8</td></tr>
        <tr><td>8</td><td>4.1</td><td>9.1</td><td>24.1</td><td>24.1</td><td>10.8</td><td>-4.1</td></tr>
        <tr><td>9</td><td>7.3</td><td>10.0</td><td>25.0</td><td>23.9</td><td>10.0</td><td>-5.0</td></tr>
        <tr><td>10</td><td>4.9</td><td>9.1</td><td>26.1</td><td>25.2</td><td>10.0</td><td>-6.1</td></tr>
    </tbody>
    </table>

??? info "点击查看总均值、边际均值与单元均值"

    对于这份数据，单元均值、边际均值和总均值如下：

    | 反馈类型 | $B_1$ 简单<br>$\bar{y}_{i,1,.}$ | $B_2$ 困难<br>$\bar{y}_{i,2,.}$ | 反馈边际均值<br>$\bar{y}_{i,.,.}$ |
    |---|---:|---:|---:|
    | $A_1$ 鼓励型 | 5.00 | 25.00 | 15.00 |
    | $A_2$ 中性 | 10.00 | 10.00 | 10.00 |
    | $A_3$ 批评型 | 25.50 | -5.50 | 10.00 |
    | 难度边际均值<br>$\bar{y}_{.,j,.}$ | 13.50 | 9.83 | $\hat{\mu}=11.67$ |

??? info "点击查看交互作用图"
    ![单元均值的交互作用图。](https://r2.chunyi-lin.com/docs/study-notes/experiment-design-and-statistical-analysis/01_ANOVA/01_Introduction/plot1_zh.svg)
    折线不平行，提示反馈类型的效应取决于任务难度，这意味着模型中存在交互项 $(\alpha\beta)_{i,j}$。

!!! note

    例子中的数据值是出于演示目的由计算机生成的。

### 双因素线性模型

我们想问的问题是：

*是什么导致了任务表现的变异？或者说，这些变异从何而来？这些变异是有意义的，还是只是被随机误差放大了？*

现在我们来看每一名被试的分数。

$$y_{i,j,k} \; (i\in\{1,2,3\},j\in\{1,2\}, k\in\{x\in\mathbb{Z}:1\leqslant x\leqslant10\})$$

是什么使每名被试的分数偏离总均值？

1. 也许是他们接受的反馈类型；
2. 也许是他们做的任务难度；
3. 也许是反馈类型和任务难度的某种特定组合在起作用；
4. 又或者，差异只反映了被试间的随机变异。

因此，我们可以构建一个模型，把上面四种可能的来源都纳入考虑。

$$
\begin{equation}
Y_{i,j,k}
=
\mu+\alpha_i+\beta_j+(\alpha\beta)_{i,j}+\varepsilon_{i,j,k}
\end{equation}
$$

这里 $Y_{i,j,k}$ 表示模型会生成的随机分数。一旦数据被观测到，我们就把观测值写作 $y_{i,j,k}$。

不过这个模型还需要一个技术性条件。按目前的写法，参数并不是唯一确定的。例如，我们可以给 $\mu$ 加上一个常数，同时让每个 $\alpha_i$ 减去同样的常数，预测值保持不变。

为了让参数可识别，我们施加常用的和为零约束：

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

遗憾的是，上面大多数项并不能直接观测。我们只能利用现有信息去*估计*这些项。

$$
\begin{equation}
y_{i,j,k}
=
\hat{\mu}+\hat{\alpha}_i+\hat{\beta}_j+\widehat{(\alpha\beta)}_{i,j}+\hat{\varepsilon}_{i,j,k}
\end{equation}
$$

其中：

$$\hat{\mu} = \frac{1}{IJK} \sum_{i,j,k}y_{i,j,k}$$

称为因变量 $y$ 的总均值。

$$
\hat{\alpha}_i = \frac{1}{JK}\sum_{j,k} (y_{i,j,k} -\hat{\mu}) = \frac{1}{JK} \sum_{j,k} y_{i,j,k} - \hat{\mu}
$$

称为反馈类型的主效应。注意这里减去了总均值。

我们这样做，是因为我们想知道反馈类型在总均值*之上*做了什么。

类似地，对于任务难度的主效应：

$$
\hat{\beta}_j = \frac{1}{IK}\sum_{i,k}(y_{i,j,k}- \hat{\mu}) = \frac{1}{IK}\sum_{i,k}y_{i,j,k}-\hat{\mu}
$$

那么 $\widehat{(\alpha\beta)}_{i,j}$ 这一项呢？

它称为反馈类型与任务难度的交互作用。

$$
\widehat{(\alpha\beta)}_{i,j} = \frac{1}{K} \sum_{k} y_{i,j,k} - \hat{\mu} - \hat{\alpha}_i - \hat{\beta}_j
$$

我们想知道 $\widehat{(\alpha\beta)}_{i,j}$ 在 $\hat{\alpha}_i$、$\hat{\beta}_j$ 和总均值 $\hat{\mu}$ *之上*还做了什么。

而剩下的 $\hat{\varepsilon}_{i,j,k}$ 就是单元 $(i,j)$ 中第 $k$ 名被试的残差误差。

$$
\begin{aligned}
\hat{\varepsilon}_{i,j,k} &= y_{i,j,k}-\hat{\mu} - \hat{\alpha}_i -\hat{\beta}_j - \widehat{(\alpha\beta)}_{i,j} \\
&= y_{i,j,k} - \hat{\mu} - \hat{\alpha}_i - \hat{\beta}_j - (\frac{1}{K} \sum_{k} y_{i,j,k} - \hat{\mu} - \hat{\alpha}_i - \hat{\beta}_j) \\
&= y_{i,j,k} - \frac{1}{K} \sum_{k} y_{i,j,k}
\end{aligned}
$$

记

$$
\begin{gather*}
\bar{y}_{i,.,.} = \frac{1}{JK} \sum_{j,k} y_{i,j,k} \\
\bar{y}_{.,j,.} = \frac{1}{IK}\sum_{i,k}y_{i,j,k} \\
\bar{y}_{i,j,.} = \frac{1}{K} \sum_{k} y_{i,j,k}
\end{gather*}
$$

把这些代回前面定义的模型：

$$
\begin{align*}
y_{i,j,k} &= \hat\mu + (\frac{1}{JK} \sum_{j,k} y_{i,j,k} - \hat\mu) + (\frac{1}{IK}\sum_{i,k}y_{i,j,k}- \hat\mu) + [\frac{1}{K} \sum_{k} y_{i,j,k} - \hat\mu -(\frac{1}{JK} \sum_{j,k} y_{i,j,k} - \hat\mu) - (\frac{1}{IK}\sum_{i,k}y_{i,j,k}- \hat\mu)] + \varepsilon_{i,j,k} \\
y_{i,j,k} &= \hat\mu + (\bar{y}_{i,.,.} - \hat\mu) + (\bar{y}_{.,j,.} - \hat\mu) + (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) + (y_{i,j,k} - \bar{y}_{i,j,.}) \\
\end{align*}
$$

$$
\begin{equation}
y_{i,j,k} - \hat\mu = \underbrace{(\bar{y}_{i,.,.} - \hat\mu)}_{\hat{\alpha}_i} + \underbrace{(\bar{y}_{.,j,.} - \hat\mu)}_{\hat{\beta}_j} + \underbrace{(\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)}_{\widehat{(\alpha\beta)}_{i,j}} + \underbrace{(y_{i,j,k} - \bar{y}_{i,j,.})}_{\hat{\varepsilon}_{i,j,k}}
\end{equation}
$$

!!! note "为什么需要这些约束？"

    这个模型中存在多种冗余的写法去描述同一个拟合值。如果不加约束，每个参数都不会对应到唯一的数值。

    和为零约束选择了一种方便的约定：主效应是相对于总均值的偏差；而交互效应则是去掉总均值与主效应之后，单元剩下的那部分偏差。

## 从单个观测到整个数据集

前面我们说明了一个单独的观测值可以怎样被分解：

$$
y_{i,j,k}
=\mu+\alpha_i+\beta_j+(\alpha\beta)_{i,j}+\varepsilon_{i,j,k}.
$$

这意味着一名被试的分数可能反映了总均值、反馈类型的效应、任务难度的效应、二者的交互作用以及残差误差。

我们也承认 $\mu$、$\alpha_i$、$\beta_j$、$(\alpha\beta)_{i,j}$ 和 $\varepsilon_{i,j,k}$ 的精确值无法得知，只能从已有观测中*估计*这些成分。

$$
y_{i,j,k}
=
\hat{\mu}+\hat{\alpha}_i+\hat{\beta}_j+\widehat{(\alpha\beta)}_{i,j}+\hat{\varepsilon}_{i,j,k}
$$

然而仅凭一个观测值，我们无法估计出所有这些成分。一个数据点不足以确定多个未知量。所以我们要用整个数据集来计算总均值、边际均值和单元均值，再用它们去估计这些成分。

设 $n(i,j,k)=(i-1)JK+(j-1)K+k$，

$$
\mathbf{y}_{n(i,j,k)}=y_{i,j,k} \Leftrightarrow
\mathbf{y} = 
\begin{bmatrix}
y_{1,1,1}\\
y_{1,1,2}\\
\vdots \\
y_{1,1,K} \\
y_{1,2,1} \\
\vdots \\
y_{I,J,K}
\end{bmatrix}_N,\;
$$

$$
\hat{\boldsymbol{\mu}} =
\begin{bmatrix}
\hat\mu \\
\hat\mu \\
\vdots \\
\hat\mu
\end{bmatrix}_{N},\;
\hat{\boldsymbol{\alpha}}_{n(i,j,k)} = \hat{\alpha}_i,\;
\hat{\boldsymbol{\beta}}_{n(i,j,k)} = \hat{\beta}_j,\;
\widehat{\boldsymbol{\alpha\beta}}_{n(i,j,k)} = \widehat{(\alpha\beta)}_{i,j},\;
$$

以及

$$
\hat{\boldsymbol{\varepsilon}}_{n(i,j,k)}=\hat{\varepsilon}_{i,j,k}.
$$

我们现在可以把全部 $N=IJK$ 个观测值堆叠成 $\mathbb{R}^N$ 中的向量。这样一来，分解就化为一个向量等式：

$$
\begin{equation}
\mathbf{y}-\hat{\boldsymbol{\mu}}=\hat{\boldsymbol{\alpha}}+\hat{\boldsymbol{\beta}}+\widehat{\boldsymbol{\alpha\beta}}+\hat{\boldsymbol{\varepsilon}}.
\end{equation}
$$

### 拟合向量之间的相互正交性

事实上，这里每一对拟合向量都彼此正交。

| 正交关系 | 原因 |
|---|---|
| $\hat{\boldsymbol{\alpha}}\perp\hat{\boldsymbol{\mu}}$ | $\sum_i\hat{\alpha}_i=0$ |
| $\hat{\boldsymbol{\beta}}\perp\hat{\boldsymbol{\mu}}$ | $\sum_j\hat{\beta}_j=0$ |
| $\widehat{\boldsymbol{\alpha\beta}}\perp\hat{\boldsymbol{\mu}}$ | $\sum_{i,j}\widehat{(\alpha\beta)}_{i,j}=0$ |
| $\hat{\boldsymbol{\alpha}}\perp\hat{\boldsymbol{\beta}}$ | 平衡全因子设计 |
| $\hat{\boldsymbol{\alpha}}\perp\widehat{\boldsymbol{\alpha\beta}}$ | 对每个 $i$，$\sum_j\widehat{(\alpha\beta)}_{i,j}=0$ |
| $\hat{\boldsymbol{\beta}}\perp\widehat{\boldsymbol{\alpha\beta}}$ | 对每个 $j$，$\sum_i\widehat{(\alpha\beta)}_{i,j}=0$ |
| $\hat{\boldsymbol{\varepsilon}}\perp$ 其他四个向量 | 单元内 $\sum_k\widehat{\varepsilon}_{(i,j,k)}=0$ |

表中"平衡全因子设计"那一条暗示这些正交关系并非偶然。本实验采用的是**平衡全因子设计**，每个单元都有相同数量的观测 $K$。后续章节会更详细地讨论它的含义，以及当一个设计不再*平衡*时会发生什么。

### 衡量拟合向量的大小

我们现在想用一个数值来概括每个成分向量在整个数据集上的大小。衡量向量大小的自然几何度量，是它的**平方范数**：

$$\|\mathbf{v}\|^2 = \sum_{i,j,k} v_{i,j,k}^2.$$

之所以选择平方范数，是因为它通过勾股定理与正交性相联系：

$$\mathbf{u}\perp\mathbf{v} \Leftrightarrow \|\mathbf{u}+\mathbf{v}\|^2 = \|\mathbf{u}\|^2 + \|\mathbf{v}\|^2,$$

其中 $\mathbf{u}\perp\mathbf{v} \Leftrightarrow\sum_{i,j,k} u_{i,j,k}\,v_{i,j,k}=0$。

其他自然的向量大小度量都不具备这种可加性。例如，即使 $\mathbf{u}\perp\mathbf{v}$，$\sum|u_i+v_i|$ 一般也不等于 $\sum|u_i|+\sum|v_i|$。

现在对等式 (4) 两边取平方范数：

$$
\begin{align}
\|\mathbf{y}-\hat{\boldsymbol{\mu}}\|^2&=\|\hat{\boldsymbol{\alpha}}+\hat{\boldsymbol{\beta}}+\widehat{\boldsymbol{\alpha\beta}}+\hat{\boldsymbol{\varepsilon}}\|^2 \notag \\
&= \|\hat{\boldsymbol{\alpha}}\|^2+\|\hat{\boldsymbol{\beta}}\|^2+\|\widehat{\boldsymbol{\alpha\beta}}\|^2+\|\hat{\boldsymbol{\varepsilon}}\|^2 + 2\langle\hat{\boldsymbol{\alpha}},\hat{\boldsymbol{\beta}}\rangle + 2\langle\hat{\boldsymbol{\alpha}},\widehat{\boldsymbol{\alpha\beta}}\rangle + 2\langle\hat{\boldsymbol{\alpha}},\hat{\boldsymbol{\varepsilon}}\rangle \notag\\
&+2\langle\hat{\boldsymbol{\beta}},\widehat{\boldsymbol{\alpha\beta}}\rangle +2\langle\hat{\boldsymbol{\beta}},\hat{\boldsymbol{\varepsilon}}\rangle +2\langle\widehat{\boldsymbol{\alpha\beta}},\hat{\boldsymbol{\varepsilon}}\rangle\notag \\ 
&=\|\hat{\boldsymbol{\alpha}}\|^2+\|\hat{\boldsymbol{\beta}}\|^2+\|\widehat{\boldsymbol{\alpha\beta}}\|^2+\|\hat{\boldsymbol{\varepsilon}}\|^2.
\end{align}
$$

类似地，写成分量形式则为：

$$
\begin{align*}
\sum_{i,j,k}(y_{i,j,k} - \hat\mu)^2 &= \sum_{i,j,k}[(\bar{y}_{i,.,.} - \hat\mu) + (\bar{y}_{.,j,.} - \hat\mu) + (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) + (y_{i,j,k} - \bar{y}_{i,j,.})]^2 \notag \\
&= \sum_{i,j,k}(\bar{y}_{i,.,.} - \hat\mu)^2 + \sum_{i,j,k} (\bar{y}_{.,j,.} - \hat\mu)^2 + \sum_{i,j,k} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)^2 + \sum_{i,j,k} (y_{i,j,k} - \bar{y}_{i,j,.})^2.
\end{align*}
$$

??? info "点击查看右侧的展开过程"

    $$
    \begin{align*}
    \mathrm{RHS} &=  \sum_{i,j,k}[(\bar{y}_{i,.,.} - \hat\mu) + (\bar{y}_{.,j,.} - \hat\mu) + (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) + (y_{i,j,k} - \bar{y}_{i,j,.})]^2 \\
    &= \sum_{i,j,k} [(\bar{y}_{i,.,.} - \hat\mu)^2 +  (\bar{y}_{.,j,.} - \hat\mu)^2 + (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)^2 + (y_{i,j,k} - \bar{y}_{i,j,.})^2] \\
    &+ 2\sum_{i,j,k} (\bar{y}_{i,.,.} - \hat\mu)(\bar{y}_{.,j,.} - \hat\mu)+ 2\sum_{i,j,k}(\bar{y}_{i,.,.} - \hat\mu)(\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) \\
    &+ 2\sum_{i,j,k}(\bar{y}_{i,.,.} - \hat\mu)(y_{i,j,k} - \bar{y}_{i,j,.}) + 2\sum_{i,j,k}(\bar{y}_{.,j,.} - \hat\mu) (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) \\
    &+ 2\sum_{i,j,k} (\bar{y}_{.,j,.} - \hat\mu)(y_{i,j,k} - \bar{y}_{i,j,.})+ 2\sum_{i,j,k}(\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)(y_{i,j,k} - \bar{y}_{i,j,.}) \\
    \end{align*}
    $$

    第一项交叉项：

    $$
    \begin{align*}
    2\sum_{i,j,k} (\bar{y}_{i,.,.} - \hat\mu)(\bar{y}_{.,j,.} - \hat\mu) &= 2\sum_{i,j,k} (\bar{y}_{i,.,.} \bar{y}_{.,j,.} - \bar{y}_{i,.,.}\hat\mu - \bar{y}_{.,j,.}\hat\mu + \hat\mu^2) \\
    &= 2 \left[ \sum_{i,j,k} \bar{y}_{i,.,.} \bar{y}_{.,j,.} - \hat\mu\sum_{i,j,k}\bar{y}_{i,.,.} - \hat\mu\sum_{i,j,k}\bar{y}_{.,j,.} + \sum_{i,j,k}\hat\mu^2 \right] \\
    &= 2 \Bigg[ K \left( \sum_{i} \bar{y}_{i,.,.} \right) \left( \sum_{j} \bar{y}_{.,j,.} \right) - \hat\mu JK \sum_{i} \bar{y}_{i,.,.} - \hat\mu IK \sum_{j} \bar{y}_{.,j,.} + IJK\hat\mu^2 \Bigg] \\
    &= 2 \Bigg[ K \left( \sum_{i} \frac{1}{JK}\sum_{j,k}y_{i,j,k} \right) \left( \sum_{j} \frac{1}{IK}\sum_{i,k}y_{i,j,k} \right) \\
    &\quad\quad - \hat\mu JK \left( \sum_{i} \frac{1}{JK}\sum_{j,k}y_{i,j,k} \right) - \hat\mu IK \left( \sum_{j} \frac{1}{IK}\sum_{i,k}y_{i,j,k} \right) + IJK\hat\mu^2 \Bigg] \\
    &= 2 \left[ K \left( \frac{IJK}{JK}\hat\mu \right) \left( \frac{IJK}{IK}\hat\mu \right) - \hat\mu JK \left( \frac{IJK}{JK}\hat\mu \right) - \hat\mu IK \left( \frac{IJK}{IK}\hat\mu \right) + IJK\hat\mu^2 \right] \\
    &= 2 \left[ K (I\hat\mu) (J\hat\mu) - \hat\mu JK (I\hat\mu) - \hat\mu IK (J\hat\mu) + IJK\hat\mu^2 \right] \\
    &= 2 \left[ IJK\hat\mu^2 - IJK\hat\mu^2 - IJK\hat\mu^2 + IJK\hat\mu^2 \right] \\
    &= 0
    \end{align*}
    $$

    第二项交叉项：

    $$
    \begin{align*}
    2\sum_{i,j,k}(\bar{y}_{i,.,.} - \hat\mu)(\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) &= 2 \sum_{i} (\bar{y}_{i,.,.} - \hat\mu) \sum_{j,k} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) \\
    &= 2K \sum_{i} (\bar{y}_{i,.,.} - \hat\mu) \left( \sum_{j}\bar{y}_{i,j,.} - \sum_{j}\bar{y}_{i,.,.} - \sum_{j}\bar{y}_{.,j,.} + \sum_{j}\hat\mu \right) \\
    &= 2K \sum_{i} (\bar{y}_{i,.,.} - \hat\mu) \left( \sum_{j} \left( \frac{1}{K}\sum_{k}y_{i,j,k} \right) - J\bar{y}_{i,.,.} - \sum_{j} \left( \frac{1}{IK}\sum_{i,k}y_{i,j,k} \right) + J\hat\mu \right) \\
    &= 2K \sum_{i} (\bar{y}_{i,.,.} - \hat\mu) \left( \frac{1}{K}\sum_{j,k}y_{i,j,k} - J\bar{y}_{i,.,.} - \frac{1}{IK}\sum_{i,j,k}y_{i,j,k} + J\hat\mu \right) \\
    &= 2K \sum_{i} (\bar{y}_{i,.,.} - \hat\mu) \left( J\left(\frac{1}{JK}\sum_{j,k}y_{i,j,k}\right) - J\bar{y}_{i,.,.} - \frac{IJK}{IK}\hat\mu + J\hat\mu \right) \\
    &= 2K \sum_{i} (\bar{y}_{i,.,.} - \hat\mu) \left( J\bar{y}_{i,.,.} - J\bar{y}_{i,.,.} - J\hat\mu + J\hat\mu \right) \\
    &= 2K \sum_{i} (\bar{y}_{i,.,.} - \hat\mu) (0) \\
    &= 0
    \end{align*}
    $$

    第三项交叉项：

    $$
    \begin{align*}
    2\sum_{i,j,k}(\bar{y}_{i,.,.} - \hat\mu)(y_{i,j,k} - \bar{y}_{i,j,.}) &= 2\sum_{i,j} (\bar{y}_{i,.,.} - \hat\mu) \sum_{k} (y_{i,j,k} - \bar{y}_{i,j,.}) \\
    &= 2\sum_{i,j} (\bar{y}_{i,.,.} - \hat\mu) \left( \sum_{k} y_{i,j,k} - \sum_{k} \bar{y}_{i,j,.} \right) \\
    &= 2\sum_{i,j} (\bar{y}_{i,.,.} - \hat\mu) \left( \sum_{k} y_{i,j,k} - K\left( \frac{1}{K}\sum_{k}y_{i,j,k} \right) \right) \\
    &= 2\sum_{i,j} (\bar{y}_{i,.,.} - \hat\mu) \left( \sum_{k} y_{i,j,k} - \sum_{k} y_{i,j,k} \right) \\
    &= 2\sum_{i,j} (\bar{y}_{i,.,.} - \hat\mu) (0) \\
    &= 0
    \end{align*}
    $$

    第四项交叉项：

    $$
    \begin{align*}
    2\sum_{i,j,k}(\bar{y}_{.,j,.} - \hat\mu) (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) &= 2K \sum_{j} (\bar{y}_{.,j,.} - \hat\mu) \sum_{i} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) \\
    &= 2K \sum_{j} (\bar{y}_{.,j,.} - \hat\mu) \left( \sum_{i} \left( \frac{1}{K}\sum_{k}y_{i,j,k} \right) - \sum_{i} \left( \frac{1}{JK}\sum_{j,k}y_{i,j,k} \right) - I\bar{y}_{.,j,.} + I\hat\mu \right) \\
    &= 2K \sum_{j} (\bar{y}_{.,j,.} - \hat\mu) \left( \frac{1}{K}\sum_{i,k}y_{i,j,k} - \frac{1}{JK}\sum_{i,j,k}y_{i,j,k} - I\bar{y}_{.,j,.} + I\hat\mu \right) \\
    &= 2K \sum_{j} (\bar{y}_{.,j,.} - \hat\mu) \left( I\left(\frac{1}{IK}\sum_{i,k}y_{i,j,k}\right) - \frac{IJK}{JK}\hat\mu - I\bar{y}_{.,j,.} + I\hat\mu \right) \\
    &= 2K \sum_{j} (\bar{y}_{.,j,.} - \hat\mu) \left( I\bar{y}_{.,j,.} - I\hat\mu - I\bar{y}_{.,j,.} + I\hat\mu \right) \\
    &= 2K \sum_{j} (\bar{y}_{.,j,.} - \hat\mu) (0) \\
    &= 0
    \end{align*}
    $$

    第五项交叉项：

    $$
    \begin{align*}
    2\sum_{i,j,k} (\bar{y}_{.,j,.} - \hat\mu)(y_{i,j,k} - \bar{y}_{i,j,.}) &= 2\sum_{i,j} (\bar{y}_{.,j,.} - \hat\mu) \sum_{k} (y_{i,j,k} - \bar{y}_{i,j,.}) \\
    &= 2\sum_{i,j} (\bar{y}_{.,j,.} - \hat\mu) \left( \sum_{k} y_{i,j,k} - \sum_{k} \left( \frac{1}{K}\sum_{k}y_{i,j,k} \right) \right) \\
    &= 2\sum_{i,j} (\bar{y}_{.,j,.} - \hat\mu) \left( \sum_{k} y_{i,j,k} - \sum_{k} y_{i,j,k} \right) \\
    &= 2\sum_{i,j} (\bar{y}_{.,j,.} - \hat\mu) (0) \\
    &= 0
    \end{align*}
    $$

    第六项交叉项：

    $$
    \begin{align*}
    2\sum_{i,j,k}(\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)(y_{i,j,k} - \bar{y}_{i,j,.}) &= 2\sum_{i,j} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) \sum_{k} (y_{i,j,k} - \bar{y}_{i,j,.}) \\
    &= 2\sum_{i,j} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) \left( \sum_{k} y_{i,j,k} - \sum_{k} \left( \frac{1}{K}\sum_{k}y_{i,j,k} \right) \right) \\
    &= 2\sum_{i,j} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) \left( \sum_{k} y_{i,j,k} - \sum_{k} y_{i,j,k} \right) \\
    &= 2\sum_{i,j} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) (0) \\
    &= 0
    \end{align*}
    $$

记

$$
\begin{gather*}
\mathrm{SS_T} = \|\mathbf{y}-\hat{\boldsymbol{\mu}}\|^2 = \sum_{i,j,k}(y_{i,j,k}-\hat\mu)^2 \\
\mathrm{SS_A} = \|\hat{\boldsymbol{\alpha}}\|^2 = \sum_{i,j,k}(\bar{y}_{i,.,.} - \hat\mu)^2 \\
\mathrm{SS_B} = \|\hat{\boldsymbol{\beta}}\|^2 = \sum_{i,j,k} (\bar{y}_{.,j,.} - \hat\mu)^2 \\
\mathrm{SS_{A\times B}} = \|\widehat{\boldsymbol{\alpha\beta}}\|^2 = \sum_{i,j,k} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)^2 \\
\mathrm{SS_E} = \|\hat{\boldsymbol{\varepsilon}}\|^2 = \sum_{i,j,k} (y_{i,j,k} - \bar{y}_{i,j,.})^2 
\end{gather*}
$$

我们就得到了本实验的经典平方和分解公式：

$$
\begin{equation}
\mathrm{SS_T} = \mathrm{SS_A} + \mathrm{SS_B} + \mathrm{SS_{A\times B}} + \mathrm{SS_E}
\end{equation}
$$

不过在许多教材中，平方和往往通过一种称为*括号记法*的简便方法来计算。

??? info "用括号记法手工计算平方和"

    记

    $$
    T_{i,j,.}=\sum_k y_{i,j,k}
    $$

    为单元 $(i,j)$ 的总分；

    $$
    T_{i,.,.}=\sum_{j,k}y_{i,j,k}
    $$

    为反馈水平 $i$ 下的总分；

    $$
    T_{.,j,.}=\sum_{i,k}y_{i,j,k}
    $$

    为难度水平 $j$ 下的总分；

    以及

    $$
    T_{.,.,.}=\sum_{i,j,k}y_{i,j,k}
    $$

    为整个数据的总和。

    首先，总平方和：

    $$
    \mathrm{SS_T}
    =
    \sum_{i,j,k}(y_{i,j,k}-\hat\mu)^2.
    $$

    展开平方：

    $$
    \begin{aligned}
    \mathrm{SS_T}
    &=
    \sum_{i,j,k}
    \left(
    y_{i,j,k}^2
    -
    2y_{i,j,k}\hat\mu
    +
    \hat\mu^2
    \right) \\
    &=
    \sum_{i,j,k}y_{i,j,k}^2
    -
    2\hat\mu\sum_{i,j,k}y_{i,j,k}
    +
    IJK\hat\mu^2.
    \end{aligned}
    $$

    我们有

    $$
    IJK\hat\mu^2
    =
    IJK\left(\frac{T_{.,.,.}}{IJK}\right)^2
    =
    \frac{T_{.,.,.}^2}{IJK}.
    $$

    因此

    $$
    \begin{aligned}
    \mathrm{SS_T}
    &=
    \sum_{i,j,k}y_{i,j,k}^2
    -
    2\frac{T_{.,.,.}^2}{IJK}
    +
    \frac{T_{.,.,.}^2}{IJK} \\
    &=
    \sum_{i,j,k}y_{i,j,k}^2
    -
    \frac{T_{.,.,.}^2}{IJK}.
    \end{aligned}
    $$

    令 $C = \frac{T_{.,.,.}^2}{IJK}$，称 $C$ 为"校正项"。

    $$
    \mathrm{SS_T}
    =
    \sum_{i,j,k}y_{i,j,k}^2-C.
    $$

    现在考虑 $\mathrm{SS_A}$：

    $$
    \begin{align*}
    \mathrm{SS_A}
    &=
    \sum_{i,j,k}(\bar y_{i,.,.}-\hat\mu)^2 \\
    &=
    JK\sum_i(\bar y_{i,.,.}-\hat\mu)^2.
    \end{align*}
    $$

    由于

    $$
    \bar y_{i,.,.}=\frac{T_{i,.,.}}{JK},
    \qquad
    \hat\mu=\frac{T_{.,.,.}}{IJK},
    $$

    展开化简后得到

    $$
    \mathrm{SS_A}
    =
    \sum_i\frac{T_{i,.,.}^2}{JK}
    -
    \frac{T_{.,.,.}^2}{IJK}.
    $$

    因此，

    $$
    \mathrm{SS_A}
    =
    \sum_i\frac{T_{i,.,.}^2}{JK}
    -
    C.
    $$

    类似地，

    $$
    \mathrm{SS_B}
    =
    \sum_j\frac{T_{.,j,.}^2}{IK}
    -
    C.
    $$

    现在考虑交互平方和：

    $$
    \begin{align*}
    \mathrm{SS_{A\times B}}
    &=
    \sum_{i,j,k}
    (\bar y_{i,j,.}-\bar y_{i,.,.}-\bar y_{.,j,.}+\hat\mu)^2 \\
    &=
    K\sum_{i,j}
    (\bar y_{i,j,.}-\bar y_{i,.,.}-\bar y_{.,j,.}+\hat\mu)^2.
    \end{align*}
    $$

    展开化简后得到

    $$
    \mathrm{SS_{A\times B}}
    =
    K\sum_{i,j}\bar y_{i,j,.}^2
    -
    JK\sum_i\bar y_{i,.,.}^2
    -
    IK\sum_j\bar y_{.,j,.}^2
    +
    IJK\hat\mu^2.
    $$

    现在用各自对应的总分改写每个均值：

    $$
    \bar y_{i,j,.}=\frac{T_{i,j,.}}{K},
    \qquad
    \bar y_{i,.,.}=\frac{T_{i,.,.}}{JK},
    \qquad
    \bar y_{.,j,.}=\frac{T_{.,j,.}}{IK},
    \qquad
    \hat\mu=\frac{T_{.,.,.}}{IJK}.
    $$

    因此

    $$
    \mathrm{SS_{A\times B}}
    =
    \sum_{i,j}\frac{T_{i,j,.}^2}{K}
    -
    \sum_i\frac{T_{i,.,.}^2}{JK}
    -
    \sum_j\frac{T_{.,j,.}^2}{IK}
    +
    \frac{T_{.,.,.}^2}{IJK}.
    $$

    $$
    \mathrm{SS_{A\times B}}
    =
    \sum_{i,j}\frac{T_{i,j,.}^2}{K}
    -
    \sum_i\frac{T_{i,.,.}^2}{JK}
    -
    \sum_j\frac{T_{.,j,.}^2}{IK}
    +
    C.
    $$

    注意一个中间量：

    $$
    \sum_{i,j}\frac{T_{i,j,.}^2}{K}-C.
    $$

    许多教材把它称为**单元平方和**：

    $$
    \mathrm{SS_{cell}}
    =
    \sum_{i,j}\frac{T_{i,j,.}^2}{K}-C.
    $$

    在这一记号下，

    $$
    \mathrm{SS_{A\times B}}
    =
    \mathrm{SS_{cell}}
    -
    \mathrm{SS_A}
    -
    \mathrm{SS_B}.
    $$

    最后，残差平方和衡量的是围绕各单元均值的变异：

    $$
    \mathrm{SS_E}
    =
    \sum_{i,j,k}(y_{i,j,k}-\bar y_{i,j,.})^2.
    $$

    在每个单元内展开后得到

    $$
    \mathrm{SS_E}
    =
    \sum_{i,j,k}y_{i,j,k}^2
    -
    \sum_{i,j}\frac{T_{i,j,.}^2}{K}.
    $$

    为方便起见，人们也常用下面的公式来计算 $\mathrm{SS_E}$：

    $$
    \mathrm{SS_E} = \mathrm{SS_T} - \mathrm{SS_A} - \mathrm{SS_B} - \mathrm{SS_{A\times B}}
    $$

    总之：

    对这个*平衡的双因素设计*，先定义校正项

    $$
    C=\frac{T_{.,.,.}^2}{IJK}.
    $$

    然后按以下顺序计算各平方和：

    $$
    \mathrm{SS_T}
    =
    \sum_{i,j,k}y_{i,j,k}^2-C.
    $$

    $$
    \mathrm{SS_A}
    =
    \sum_i\frac{T_{i,.,.}^2}{JK}-C.
    $$

    $$
    \mathrm{SS_B}
    =
    \sum_j\frac{T_{.,j,.}^2}{IK}-C.
    $$

    $$
    \mathrm{SS_{cell}}
    =
    \sum_{i,j}\frac{T_{i,j,.}^2}{K}-C.
    $$

    $$
    \mathrm{SS_{A\times B}}
    =
    \mathrm{SS_{cell}}-\mathrm{SS_A}-\mathrm{SS_B}.
    $$

    $$
    \mathrm{SS_E}
    =
    \mathrm{SS_T}
    -
    \mathrm{SS_A}
    -
    \mathrm{SS_B}
    -
    \mathrm{SS_{A\times B}}.
    $$

    等价地，

    $$
    \mathrm{SS_E}
    =
    \sum_{i,j,k}y_{i,j,k}^2
    -
    \sum_{i,j}\frac{T_{i,j,.}^2}{K}.
    $$

## 本节小结

我们最初问的是：任务表现的变异从何而来？

现在我们已经把每个中心化的观测值分解成了四个部分：

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

每名被试相对于总均值的偏差被分解为：反馈成分、难度成分、交互成分和残差成分。

因为在这个平衡设计中，这四个拟合成分向量彼此正交，所以观测层面上的分解最终给出了总平方和的一个干净划分：

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

但我们目前还说不清，这些部分中是否有哪一个相对于 $\mathrm{SS_E}$ 已经*足够大*。

要回答这个问题，我们需要了解这些量在抽样下的行为。

下一节我们将通过引入自由度、均方与 $F$ 统计量来讨论这一点。
