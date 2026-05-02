# 引言：分解一个观测值

!!! warning "注意"
    
    查看原文请点击[这里](/en/study-notes/experiment-design-and-statistical-analysis/01_ANOVA/01_Introduction/)

本节通过一个简单的双因素例子展开讨论。我们会在同一个实验设计中提出几个相互关联的问题：每个因素如何影响观测结果，以及一个因素的效应是否会随另一个因素水平的变化而改变。

数学上，这意味着我们要把一个观测值分解成几个拟合的成分：一个总水平、两个主效应成分、一个交互成分，以及一个残差。

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

??? info "结果数值表"
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

??? info "总均值、边际均值与单元均值"

    对于这份数据，单元均值、边际均值和总均值如下：

    | 反馈类型 | $B_1$ 简单<br>$\bar{y}_{i,1,.}$ | $B_2$ 困难<br>$\bar{y}_{i,2,.}$ | 反馈边际均值<br>$\bar{y}_{i,.,.}$ |
    |---|---:|---:|---:|
    | $A_1$ 鼓励型 | $5.00$ | $25.00$ | $15.00$ |
    | $A_2$ 中性 | $10.00$ | $10.00$ | $10.00$ |
    | $A_3$ 批评型 | $25.50$ | $-5.50$ | $10.00$ |
    | 难度边际均值<br>$\bar{y}_{.,j,.}$ | $13.50$ | $9.83$ | $\hat{\mu}=11.67$ |

??? info "交互作用图"
    ![单元均值的交互作用图。](https://r2.chunyi-lin.com/docs/study-notes/experiment-design-and-statistical-analysis/01_ANOVA/01_Introduction/plot1_zh.svg)
    折线不平行，提示反馈类型的效应取决于任务难度，这意味着模型中存在交互项 $(\alpha\beta)_{i,j}$。

!!! note

    例子中的数据值是出于演示目的由计算机生成的。

### 双因素线性模型

我们想问的问题是：

*是什么导致了任务表现的变异？或者说，这些变异从何而来？这些变异是有意义的，还是只是随机误差造成的？*

为了回答这个问题，我们把每个观测值写成系统结构加上残差的形式：

$$
y_{i,j,k}=h(t_1,t_2,\ldots)+\varepsilon_{i,j,k},
$$

其中 $h$ 是若干我们认为有关变量的函数，$\varepsilon_{i,j,k}$ 是 $h$ 没有解释的剩余部分，称为残差。

接下来要决定 $h$ 的具体形式。

最简单的写法是认为没有任何系统结构：

$$
y_{i,j,k}=\mu+\varepsilon_{i,j,k}.
$$

每个观测都来自同一个隐含的水平 $\mu$，所有偏差都只是噪声。这显然不够，因为我们正是预期反馈和难度会影响表现，才操纵这两个变量。但它仍然是一个有用的基线，可以与更丰富的模型作比较。

如果反馈类型有作用：

$$
y_{i,j,k}=\mu+\alpha_i+\varepsilon_{i,j,k}.
$$

如果难度也有作用：

$$
y_{i,j,k}=\mu+\alpha_i+\beta_j+\varepsilon_{i,j,k}.
$$

如果反馈的效应还依赖于难度（或反过来）：

$$
y_{i,j,k}=\mu+\alpha_i+\beta_j+(\alpha\beta)_{i,j}+\varepsilon_{i,j,k}.
$$

最后这种形式就是本节要使用的模型。我们正式记作

$$
\mathcal{M}_F:Y_{i,j,k}=\mu+\alpha_i+\beta_j+(\alpha\beta)_{i,j}+\varepsilon_{i,j,k}.
$$

这里随机变量 $Y_{i,j,k}$ 表示模型会生成的随机分数。一旦数据被观测到，我们就把观测值写作 $y_{i,j,k}$。下标 $F$ 表示这是完整模型 (full model)。

??? info "三个或更多因素时的交互项"

    双因素模型只包含一个交互项

    $$
    (\alpha\beta)_{i,j}.
    $$

    它表示单元均值中那一部分既不能由反馈贡献 $\alpha_i$ 解释，也不能由难度贡献 $\beta_j$ 解释。

    如果有三个因素 $A_i$、$B_j$、$C_\ell$，全因子线性模型就变成

    $$
    Y_{i,j,\ell,k}
    =
    \mu
    +\alpha_i+\beta_j+\gamma_\ell
    +(\alpha\beta)_{i,j}
    +(\alpha\gamma)_{i,\ell}
    +(\beta\gamma)_{j,\ell}
    +(\alpha\beta\gamma)_{i,j,\ell}
    +\varepsilon_{i,j,\ell,k}.
    $$

    各项的角色不同：

    $$
    \begin{aligned}
    \alpha_i,\beta_j,\gamma_\ell &\quad \text{主效应},\\
    (\alpha\beta)_{i,j},(\alpha\gamma)_{i,\ell},(\beta\gamma)_{j,\ell} &\quad \text{两阶交互},\\
    (\alpha\beta\gamma)_{i,j,\ell} &\quad \text{三阶交互}.
    \end{aligned}
    $$

    两阶交互意味着一个因素的效应取决于另一个因素的水平。

    三阶交互意味着两阶交互本身也会随第三个因素水平的变化而变化。

    一般地，对于 $N$ 个因素，全因子模型包含所有非空的因素组合：所有主效应、所有两阶交互、所有三阶交互……一直到 $N$ 阶交互。

    例如，$N$ 个因素下非空项的总数为

    $$
    {N \choose 1}+{N \choose 2}+\cdots+{N \choose N}=2^N-1.
    $$

    这就是为什么因子模型会迅速膨胀。完整模型表达力强，但也更难估计、更难解释，最重要的是更容易过拟合。

不过这个模型还需要一个技术性条件。按目前的写法，参数并不是唯一确定的。例如，我们可以给 $\mu$ 加上一个常数，同时让每个 $\alpha_i$ 减去同样的常数，预测值保持不变。因此，除非我们规定一个约定，否则 $\mu$ 与 $\alpha_i$ 的具体数值无法识别。

一种常用的约定是和为零约束：

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

在这些约束下，$\mu$ 就是总均值，主效应参数刻画相对于总均值的偏差，交互参数刻画相对于可加性的偏差。

但 $\mathcal{M}_F$ 的参数无法被直接观测。表中给出的只有观测值 $y_{i,j,k}$，而不是 $\mu$、$\alpha_i$、$\beta_j$、$(\alpha\beta)_{i,j}$ 或 $\varepsilon_{i,j,k}$。

在所有可能的参数取值中，应该选哪一组？

我们需要一种*估计*这些参数的方法。

### 用最小二乘估计参数

一种方法是选择参数取值

$$
\theta=\left(\mu,\alpha_i,\beta_j,(\alpha\beta)_{i,j}\right)
$$

使模型尽可能地贴近数据。

对于一组候选参数 $\theta$，模型给出预测值

$$
y^{(\mathcal{M}_F)}_{i,j,k}(\theta)=\mu+\alpha_i+\beta_j+(\alpha\beta)_{i,j}.
$$

我们通过最小化总损失来选择参数：

$$
\min_{\theta}\sum_{i,j,k}f\left(y^{(\mathcal{M}_F)}_{i,j,k}(\theta),y_{i,j,k}\right).
$$

注意这里我们对所有数据求和。原因有两个：(1) 一个数据点不足以确定模型中四个未知参数；(2) 我们希望模型至少能*合理地*解释整个数据集。

本章使用平方误差作为损失函数，即令

$$
f(x,y)=(x-y)^2,
$$

于是

$$
\mathrm{SSE}(\theta;\mathcal{M}_F)=\sum_{i,j,k}\left(y_{i,j,k}-y^{(\mathcal{M}_F)}_{i,j,k}(\theta)\right)^2,
$$

其中 SSE 表示 sum of squared errors，即误差平方和。

我们要找的是

$$
\hat{\theta}=\left(\hat\mu,\hat\alpha_i,\hat\beta_j,\widehat{(\alpha\beta)}_{i,j}\right)=\operatorname*{arg\,min}_{\theta}\sum_{i,j,k}\left(y_{i,j,k}-y^{(\mathcal{M}_F)}_{i,j,k}(\theta)\right)^2.
$$

在继续之前，记

$$
\begin{gather*}
\bar{y}_{.,.,.}=\frac{1}{IJK}\sum_{i,j,k}y_{i,j,k} \\
\bar{y}_{i,.,.}=\frac{1}{JK}\sum_{j,k}y_{i,j,k} \\
\bar{y}_{.,j,.}=\frac{1}{IK}\sum_{i,k}y_{i,j,k} \\
\bar{y}_{i,j,.}=\frac{1}{K}\sum_{k}y_{i,j,k}
\end{gather*}
$$

??? info "估计量的推导"

    在本推导中，$\mu$、$\alpha_i$、$\beta_j$、$(\alpha\beta)_{i,j}$ 表示候选参数值。求解之后得到的估计量再带上帽子。

    要在完整模型 $\mathcal{M}_F$ 下找到估计量，我们要最小化误差平方和

    $$
    \mathrm{SSE}(\theta; \mathcal{M}_F)=\sum_{i,j,k}\left(y_{i,j,k}-\mu-\alpha_i-\beta_j-(\alpha\beta)_{i,j}\right)^2,
    $$

    并满足标准的和为零约束：

    $$
    \sum_i \alpha_i = 0 \,\quad
    \sum_j \beta_j = 0 \,\quad
    \sum_i (\alpha\beta)_{i,j} = 0 \text{ 对每一个 }j \,\quad
    \sum_j (\alpha\beta)_{i,j} = 0 \text{ 对每一个 }i.
    $$

    为了在最小化中处理这些约束，我们使用拉格朗日乘子法，把约束加进目标函数，构造出拉格朗日函数 $\mathcal{L}$。每条约束分配一个独立的乘子。

    设 $\lambda^{(\alpha)}$ 与 $\lambda^{(\beta)}$ 分别是两个主效应约束的乘子，$\gamma_j$ 与 $\tau_i$ 分别是两个交互约束的乘子。则拉格朗日函数为：

    $$
    \mathcal{L} = \sum_{i,j,k} \left( y_{i,j,k} - \mu - \alpha_i - \beta_j - (\alpha\beta)_{i,j} \right)^2 + 2\lambda^{(\alpha)} \sum_i \alpha_i + 2\lambda^{(\beta)} \sum_j \beta_j + 2\sum_j \gamma_j \left( \sum_i (\alpha\beta)_{i,j} \right) + 2\sum_i \tau_i \left( \sum_j (\alpha\beta)_{i,j} \right)
    $$

    要找极值点，对每个参数求偏导，置零并求解。

    先估计 $\mu$。

    对 $\mathcal{L}$ 关于 $\mu$ 求偏导。注意 $\mu$ 没有出现在任何约束项中，乘子立刻消失：

    $$
    \frac{\partial \mathcal{L}}{\partial \mu} = -2 \sum_{i,j,k} \left(y_{i,j,k} - \mu - \alpha_i - \beta_j - (\alpha\beta)_{i,j}\right) = 0
    $$

    两边除以 $-2$ 并把求和拆开：

    $$
    \sum_{i,j,k} y_{i,j,k} - IJK\mu - JK\sum_{i} \alpha_i - IK\sum_{j} \beta_j - K\sum_{i,j} (\alpha\beta)_{i,j} = 0
    $$

    根据约束 $\sum_i \alpha_i$ = 0、$\sum_j \beta_j = 0$、$\sum_{i,j} (\alpha\beta)_{i,j}$ = 0，那些项全部为零：

    $$
    \sum_{i,j,k} y_{i,j,k} - IJK\mu = 0 \implies \hat{\mu} = \frac{\sum_{i,j,k} y_{i,j,k}}{IJK} = \bar{y}_{.,.,.}
    $$

    再估计 $\alpha_i$。

    对 $\mathcal{L}$ 关于某个具体的 $\alpha_i$ 求偏导。这次 $\alpha_i$ 出现在惩罚项 $2\lambda^{(\alpha)} \sum_i \alpha_i$ 中，乘子保留：

    $$
    \frac{\partial \mathcal{L}}{\partial \alpha_i} = -2 \sum_{j,k} \left(y_{i,j,k} - \mu - \alpha_i - \beta_j - (\alpha\beta)_{i,j}\right) + 2\lambda^{(\alpha)} = 0
    $$

    两边除以 $-2$ 并拆开求和：

    $$
    \sum_{j,k} y_{i,j,k} - JK\mu - JK\alpha_i - K\sum_{j} \beta_j - K\sum_{j} (\alpha\beta)_{i,j} - \lambda^{(\alpha)} = 0
    $$

    应用约束 $\sum_j \beta_j = 0$ 和 $\sum_j (\alpha\beta)_{i,j} = 0$，方程化简为：

    $$
    \sum_{j,k} y_{i,j,k} - JK\mu - JK\alpha_i - \lambda^{(\alpha)} = 0
    $$

    怎么求 $\lambda^{(\alpha)}$？把整个方程对 $i$ 的所有 $I$ 个水平再求和：

    $$
    \sum_{i} \left(\sum_{j,k} y_{i,j,k} - JK\mu - JK\alpha_i - \lambda^{(\alpha)} \right) = 0
    $$

    $$
    \sum_{i,j,k} y_{i,j,k} - IJK\mu - JK\sum_i \alpha_i - I\lambda^{(\alpha)} = 0
    $$

    我们已知 $\sum_i \alpha_i = 0$，并且 $\sum_{i,j,k} y_{i,j,k} - IJK\mu = 0$。两类项相互抵消，剩下：

    $$
    - I\lambda^{(\alpha)} = 0 \implies \lambda^{(\alpha)} = 0
    $$

    乘子为零，把它从前一个方程里去掉：

    $$
    \sum_{i,j} y_{i,j,k} - JK\mu - JK\alpha_i = 0
    $$

    两边除以 $JK$，代入 $\mu=\bar{y}_{.,.,.}$：

    $$
    \bar{y}_{i,.,.} - \bar{y}_{.,.,.} - \alpha_i = 0 \implies \hat{\alpha}_i = \bar{y}_{i,.,.} - \bar{y}_{.,.,.}
    $$

    再估计 $\beta_j$。

    完全类比地，对 $\mathcal{L}$ 关于某个具体的 $\beta_j$ 求偏导：

    $$
    \frac{\partial \mathcal{L}}{\partial \beta_j} = -2 \sum_{i,k} \left(y_{i,j,k} - \mu - \alpha_i - \beta_j - (\alpha\beta)_{i,j}\right) + 2\lambda^{(\beta)} = 0
    $$

    除以 $-2$ 并应用约束 $\sum_i \alpha_i = 0$、$\sum_i (\alpha\beta)_{i,j} = 0$，得到：

    $$
    \sum_{i,k} y_{i,j,k} - IK\mu - IK\beta_j - \lambda^{(\beta)} = 0
    $$

    再对 $j$ 的所有 $J$ 个水平求和，即可看出 $\lambda^{(\beta)} = 0$。去掉乘子并除以 $IK$：

    $$
    \bar{y}_{.,j,.} - \bar{y}_{.,.,.} - \beta_j = 0 \implies \hat{\beta}_j = \bar{y}_{.,j,.} - \bar{y}_{.,.,.}
    $$

    最后估计 $(\alpha\beta)_{i,j}$，对 $\mathcal{L}$ 关于某个具体的交互单元 $(\alpha\beta)_{i,j}$ 求偏导。

    这个参数同时出现在两条约束的惩罚项里，因此两个乘子（$\gamma_j$ 与 $\tau_i$）都会出现：

    $$
    \frac{\partial \mathcal{L}}{\partial (\alpha\beta)_{i,j}} = -2 \sum_{k} \left(y_{i,j,k} - \mu - \alpha_i - \beta_j - (\alpha\beta)_{i,j}\right) + 2\gamma_j + 2\tau_i = 0
    $$

    除以 $-2$，并把对该单元 $K$ 个被试的求和展开：

    $$
    \sum_{k} y_{i,j,k} - K\mu - K\alpha_i - K\beta_j - K(\alpha\beta)_{i,j} - \gamma_j - \tau_i = 0
    $$

    要处理乘子，先对 $i$ 求和，再对 $j$ 求和。先对 $i$ 求和：

    $$
    \sum_i \sum_{k} y_{i,j,k} - IK\mu - K\sum_i \alpha_i - IK\beta_j - K\sum_i (\alpha\beta)_{i,j} - \sum_i \gamma_j - \sum_i \tau_i = 0
    $$

    应用约束 $\sum_i \alpha_i = 0$ 与 $\sum_i (\alpha\beta)_{i,j} = 0$：

    $$
    \sum_{i,k} y_{i,j,k} - IK\mu - IK\beta_j - I\gamma_j - \sum_i \tau_i = 0
    $$

    注意前三项 $\sum_{i,k} y_{i,j,k} - IK\mu - IK\beta_j$ 正好与估计 $\beta_j$ 时的方程相同，其值为 0。因此：

    $$
    - I\gamma_j - \sum_i \tau_i = 0 \implies I\gamma_j + \sum_i \tau_i = 0
    $$

    类似地，对最初的单元方程关于 $j$ 求和则得到：

    $$
    \sum_j \gamma_j + J\tau_i = 0
    $$

    令 $S_\gamma = \sum_j \gamma_j$、$S_\tau = \sum_i \tau_i$。两条等式告诉我们 $\gamma_j = -S_\tau / I$（即 $\gamma_j$ 是与 $j$ 无关的常数），$\tau_i = -S_\gamma / J$（即 $\tau_i$ 是与 $i$ 无关的常数）。它们都是常数，因此互相抵消：在每个单元上 $\gamma_j+\tau_i=0$。

    乘子归零后，回到原来的单元方程：

    $$
    \sum_{k} y_{i,j,k} - K\mu - K\alpha_i - K\beta_j - K(\alpha\beta)_{i,j} = 0
    $$

    除以 $K$，把单元总和换成单元均值：

    $$
    \bar{y}_{i,j,.} - \mu - \alpha_i - \beta_j - (\alpha\beta)_{i,j} = 0
    $$

    把先前求出的 $\mu$、$\alpha_i$、$\beta_j$ 估计量代入：

    $$
    \begin{align*}
    \widehat{(\alpha\beta)}_{i,j} &= \bar{y}_{i,j,.} - \bar{y}_{.,.,.} - (\bar{y}_{i,.,.} - \bar{y}_{.,.,.}) - (\bar{y}_{.,j,.} - \bar{y}_{.,.,.}) \\
    &= \bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \bar{y}_{.,.,.}
    \end{align*}
    $$

总的来说：

$$
\begin{gather*}
\hat{\mu} = \bar{y}_{.,.,.} \\
\hat{\alpha}_i = \bar{y}_{i,.,.} - \bar{y}_{.,.,.} \\
\hat{\beta}_j = \bar{y}_{.,j,.} - \bar{y}_{.,.,.} \\
\widehat{(\alpha\beta)}_{i,j} = \bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \bar{y}_{.,.,.}
\end{gather*}
$$

剩下的残差 $\hat{\varepsilon}_{i,j,k}$ 为

$$
\begin{aligned}
\hat{\varepsilon}_{i,j,k} &= y_{i,j,k} - \hat{y}^{(\mathcal{M}_F)}_{i,j,k}\\
&=y_{i,j,k}-\hat{\mu} - \hat{\alpha}_i -\hat{\beta}_j - \widehat{(\alpha\beta)}_{i,j} \\
&= y_{i,j,k} - \hat{\mu} - \hat{\alpha}_i - \hat{\beta}_j - (\bar{y}_{i,j,.} - \hat{\mu} - \hat{\alpha}_i - \hat{\beta}_j) \\
&= y_{i,j,k} - \bar{y}_{i,j,.}
\end{aligned}
$$

把这些代回模型 $\mathcal{M}_F$：

$$
\begin{align*}
y_{i,j,k} &= \bar{y}_{.,.,.} + (\bar{y}_{i,.,.} - \bar{y}_{.,.,.}) + (\bar{y}_{.,j,.} - \bar{y}_{.,.,.}) + (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \bar{y}_{.,.,.}) + (y_{i,j,k} - \bar{y}_{i,j,.}) \\
y_{i,j,k} - \bar{y}_{.,.,.} &= \underbrace{(\bar{y}_{i,.,.} - \bar{y}_{.,.,.})}_{\hat{\alpha}_i} + \underbrace{(\bar{y}_{.,j,.} - \bar{y}_{.,.,.})}_{\hat{\beta}_j} + \underbrace{(\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \bar{y}_{.,.,.})}_{\widehat{(\alpha\beta)}_{i,j}} + \underbrace{(y_{i,j,k} - \bar{y}_{i,j,.})}_{\hat{\varepsilon}_{i,j,k}}
\end{align*}
$$

### 拟合分量的解释

总均值

$$
\hat{\mu}=\bar{y}_{.,.,.}
$$

是数据集的总体拟合水平。

反馈效应

$$
\hat{\alpha}_i=\bar{y}_{i,.,.}-\bar{y}_{.,.,.}
$$

是反馈水平 $i$ 相对于总均值的偏离，刻画了该反馈水平整体上比平均水平高出或低出多少。

类似地，

$$
\hat{\beta}_j=\bar{y}_{.,j,.}-\bar{y}_{.,.,.}
$$

是难度水平 $j$ 相对于总均值的偏离。

交互项

$$
\widehat{(\alpha\beta)}_{i,j}=\bar{y}_{i,j,.}-\bar{y}_{i,.,.}-\bar{y}_{.,j,.}+\bar{y}_{.,.,.}
$$

是单元均值在扣除总均值、反馈主效应、难度主效应之后剩下的部分。

最后，

$$
\hat{\varepsilon}_{i,j,k}=y_{i,j,k}-\bar{y}_{i,j,.}
$$

是单元 $(i,j)$ 内被试 $k$ 相对于该单元均值的偏离。

## 把分解写成向量

我们现在把全部 $N=IJK$ 个观测堆叠成 $\mathbb{R}^N$ 中的向量。

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

记

$$
\mathbf{m}=\boldsymbol{\mu}+\boldsymbol{\alpha}+\boldsymbol{\beta}+\boldsymbol{\alpha\beta},
$$

其中每个分量向量长度都是 $N$。

在向量记号下，$\mathcal{M}_F$ 决定了一组拟合向量的集合，即所有由满足和为零约束的某种 $\mu$、$\alpha_i$、$\beta_j$、$(\alpha\beta)_{i,j}$ 取值产生的向量。

我们把这个集合称为完整模型的**模型空间**，记作 $\mathcal{S}_F$：

$$
\mathcal{S}_F=\left\{\mathbf{m}\in\mathbb{R}^N: m_{n(i,j,k)}=\mu+\alpha_i+\beta_j+(\alpha\beta)_{i,j}\text{ 对所有 } i,j,k,\;\sum_i\alpha_i=0,\;\sum_j\beta_j=0,\;\sum_i(\alpha\beta)_{i,j}=0\text{ 对每一个 }j,\;\sum_j(\alpha\beta)_{i,j}=0\text{ 对每一个 }i\right\}.
$$

对任意候选拟合向量 $\mathbf{m}\in\mathcal{S}_F$，平方误差损失为

$$
L(\mathbf{m})=\|\mathbf{y}-\mathbf{m}\|^2.
$$

最小二乘的选择是

$$
\hat{\mathbf{y}}=\operatorname*{arg\,min}_{\mathbf{m}\in\mathcal{S}_F}\|\mathbf{y}-\mathbf{m}\|^2.
$$

拟合后，完整模型的残差平方和为

$$
\mathrm{SSE}(\hat{\theta}^{(\mathcal{M}_F)};\mathcal{M}_F)=\|\mathbf{y}-\hat{\mathbf{y}}\|^2.
$$

换句话说，在模型允许的所有拟合向量中，最小二乘选择了与观测数据向量最接近的那一个。

### 拟合分量的正交性

先看残差向量

$$
\hat{\boldsymbol{\varepsilon}}=\mathbf{y}-\hat{\mathbf{y}}.
$$

最小二乘把 $\hat{\mathbf{y}}$ 选作 $\mathcal{S}_F$ 中距离 $\mathbf{y}$ 最近的拟合向量。

直观上，这意味着残差不能再包含任何完整模型可以拟合的方向。如果还存在这样的方向，我们就可以把 $\hat{\mathbf{y}}$ 沿那个方向稍微移动一点，从而进一步减小残差长度。

因此，残差向量与完整模型空间正交：

$$
\hat{\boldsymbol{\varepsilon}}\perp\mathcal{S}_F.
$$

由于 $\hat{\boldsymbol{\mu}}$、$\hat{\boldsymbol{\alpha}}$、$\hat{\boldsymbol{\beta}}$、$\widehat{\boldsymbol{\alpha\beta}}$ 都是 $\mathcal{S}_F$ 中的向量，残差与它们各自正交：

$$
\hat{\boldsymbol{\varepsilon}}\perp\hat{\boldsymbol{\mu}},
\qquad
\hat{\boldsymbol{\varepsilon}}\perp\hat{\boldsymbol{\alpha}},
\qquad
\hat{\boldsymbol{\varepsilon}}\perp\hat{\boldsymbol{\beta}},
\qquad
\hat{\boldsymbol{\varepsilon}}\perp\widehat{\boldsymbol{\alpha\beta}}.
$$

目前这只是几何直观。下一章讨论一般线性模型时会给出形式化证明。

而 $\hat{\boldsymbol{\mu}}$、$\hat{\boldsymbol{\alpha}}$、$\hat{\boldsymbol{\beta}}$、$\widehat{\boldsymbol{\alpha\beta}}$ 之间也彼此正交。

这是平衡全因子设计与我们对各效应的定义共同决定的。下一章我们会详细讨论这意味着什么，以及当设计不再平衡时会发生什么。

| 正交关系 | 原因 |
|---|---|
| $\hat{\boldsymbol{\mu}}\perp\hat{\boldsymbol{\alpha}}$ | $\sum_i\hat{\alpha}_i=0$ |
| $\hat{\boldsymbol{\mu}}\perp\hat{\boldsymbol{\beta}}$ | $\sum_j\hat{\beta}_j=0$ |
| $\hat{\boldsymbol{\mu}}\perp\widehat{\boldsymbol{\alpha\beta}}$ | 交互项在每行每列上都和为零 |
| $\hat{\boldsymbol{\alpha}}\perp\hat{\boldsymbol{\beta}}$ | 平衡的重复让反馈方向与难度方向分离 |
| $\hat{\boldsymbol{\alpha}}\perp\widehat{\boldsymbol{\alpha\beta}}$ | 对每个 $i$，$\sum_j\widehat{(\alpha\beta)}_{i,j}=0$ |
| $\hat{\boldsymbol{\beta}}\perp\widehat{\boldsymbol{\alpha\beta}}$ | 对每个 $j$，$\sum_i\widehat{(\alpha\beta)}_{i,j}=0$ |
| $\hat{\boldsymbol{\varepsilon}}\perp$ 所有拟合分量 | 最小二乘的残差正交性 |

### 拟合向量的大小

我们已经在最小二乘问题里用平方误差作为衡量模型拟合的尺度。在向量记号下，这意味着用平方 $L^2$ 范数衡量偏差：

$$
\|\mathbf{y}-\mathbf{m}\|^2.
$$

现在我们想刻画最小二乘所产生的拟合分解：

$$
\mathbf{y}-\hat{\boldsymbol{\mu}}=\hat{\boldsymbol{\alpha}}+\hat{\boldsymbol{\beta}}+\widehat{\boldsymbol{\alpha\beta}}+\hat{\boldsymbol{\varepsilon}}.
$$

问题是：每个分量在这个分解中有多大？

为了与最小二乘保持同一尺度，我们用同一套 $L^2$ 几何来衡量每个分量。对向量 $\mathbf{v}\in\mathbb{R}^N$，

$$
\|\mathbf{v}\|^2=\sum_{n=1}^Nv_n^2.
$$

按我们的下标记法即

$$
\|\mathbf{v}\|^2=\sum_{i,j,k}v_{n(i,j,k)}^2.
$$

这种选择有一个重要好处：平方 $L^2$ 范数与正交性配合得很干净。如果两个向量正交，则

$$
\mathbf{u}\perp\mathbf{v}\implies\|\mathbf{u}+\mathbf{v}\|^2=\|\mathbf{u}\|^2+\|\mathbf{v}\|^2.
$$

类似地，对 $q$ 个相互正交的向量：

$$
\left\|\sum_{\ell=1}^q\mathbf{v}_\ell\right\|^2=\sum_{\ell=1}^q\|\mathbf{v}_\ell\|^2.
$$

因此，定义最小二乘拟合的同一 $L^2$ 几何，也允许我们把拟合分解化为各分量平方长度的可加分解。

应用到我们的分解上：

$$
\begin{align*}
\|\mathbf{y}-\hat{\boldsymbol{\mu}}\|^2&=\|\hat{\boldsymbol{\alpha}}+\hat{\boldsymbol{\beta}}+\widehat{\boldsymbol{\alpha\beta}}+\hat{\boldsymbol{\varepsilon}}\|^2 \\
&=\|\hat{\boldsymbol{\alpha}}\|^2+\|\hat{\boldsymbol{\beta}}\|^2+\|\widehat{\boldsymbol{\alpha\beta}}\|^2+\|\hat{\boldsymbol{\varepsilon}}\|^2.
\end{align*}
$$

按分量展开则为：

$$
\begin{align*}
\sum_{i,j,k}(y_{i,j,k} - \hat\mu)^2
&= \sum_{i,j,k}(\bar{y}_{i,.,.} - \hat\mu)^2 + \sum_{i,j,k} (\bar{y}_{.,j,.} - \hat\mu)^2 \\ &+  \sum_{i,j,k} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)^2 + \sum_{i,j,k} (y_{i,j,k} - \bar{y}_{i,j,.})^2.
\end{align*}
$$

??? info "右侧的展开过程"

    $$
    \begin{align*}
    \text{等式右边} &=  \sum_{i,j,k}[(\bar{y}_{i,.,.} - \hat\mu) + (\bar{y}_{.,j,.} - \hat\mu) + (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) + (y_{i,j,k} - \bar{y}_{i,j,.})]^2 \\
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

    令 $C = \frac{T_{.,.,.}^2}{IJK}$，称 $C$ 为“校正项”。

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

我们先把每个观测值写成

$$
\text{观测值} = \text{系统结构} + \text{残差}.
$$

对本实验，系统结构来自双因素设计。完整模型为

$$
Y_{i,j,k}=\mu+\alpha_i+\beta_j+(\alpha\beta)_{i,j}+\varepsilon_{i,j,k}.
$$

它把每个分数表示为总水平、反馈成分、难度成分、反馈—难度交互成分以及一个残差。

由于模型中的参数无法直接观测，我们用最小二乘进行估计。以平方误差为损失，拟合分量为

$$
\begin{gather*}
\hat{\mu}=\bar{y}_{.,.,.}, \\
\hat{\alpha}_i=\bar{y}_{i,.,.}-\bar{y}_{.,.,.}, \\
\hat{\beta}_j=\bar{y}_{.,j,.}-\bar{y}_{.,.,.}, \\
\widehat{(\alpha\beta)}_{i,j}=\bar{y}_{i,j,.}-\bar{y}_{i,.,.}-\bar{y}_{.,j,.}+\bar{y}_{.,.,.}, \\
\hat{\varepsilon}_{i,j,k}=y_{i,j,k}-\bar{y}_{i,j,.}.
\end{gather*}
$$

每个中心化的观测值因此被分解为

$$
y_{i,j,k}-\hat{\mu}=\hat{\alpha}_i+\hat{\beta}_j+\widehat{(\alpha\beta)}_{i,j}+\hat{\varepsilon}_{i,j,k}.
$$

进一步把这一标量分解写成向量形式：

$$
\mathbf{y}-\hat{\boldsymbol{\mu}}=\hat{\boldsymbol{\alpha}}+\hat{\boldsymbol{\beta}}+\widehat{\boldsymbol{\alpha\beta}}+\hat{\boldsymbol{\varepsilon}}.
$$

在向量记号下，完整模型对应一个拟合向量空间 $\mathcal{S}_F$，最小二乘则在这个空间中选择与观测向量 $\mathbf{y}$ 最近的拟合向量。

这种几何视角自然解释了平方和为何会出现。最小二乘用平方 $L^2$ 距离衡量模型的偏离，平衡的全因子设计又使各拟合分量向量两两正交，正交性进一步让平方长度可以直接相加：

$$
\mathrm{SS_T}=\mathrm{SS_A}+\mathrm{SS_B}+\mathrm{SS_{A\times B}}+\mathrm{SS_E}.
$$

在这个平衡的双因素设计中，相对于总均值的总平方和被划分为反馈、难度、交互与残差四部分。

但我们目前还说不清，这些部分中是否有哪一个相对于 $\mathrm{SS_E}$ 已经*足够大*。

要回答这个问题，我们需要了解这些量在抽样下的行为。

下一节我们将通过引入自由度、均方与 $F$ 统计量来讨论这一点。
