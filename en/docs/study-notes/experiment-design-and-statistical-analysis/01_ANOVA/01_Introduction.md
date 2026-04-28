# Introduction: Decomposing an Observation

## An Example

### Design and Raw Data

We want to study how feedback type ($A_1$ encouraging, $A_2$ neutral, $A_3$ critical) and task difficulty ($B_1$ easy and $B_2$ difficult) influence participants' task performance.

Participants first complete a baseline task, then receive one of three feedback types $A_i \;(i\in\{1,2,3\})$. After which they perform a task of difficulty $B_j \; (j\in\{1,2\})$

The dependent variable $y$ is participants' task performance measured by accuracy and time used, subtract their baseline task performance measured by the same metrics. 

$$
y=\text{post-feedback performance}-\text{baseline performance}.
$$

For this example, assume accuracy and time used have already been combined into one standardized performance score, where larger values indicate greater improvement.

Each feedback $\times$ difficulty condition contains 10 participants.

The results are as follows.

??? info "Click to expand the result table"
    <table>
        <thead>
        <tr>
            <th rowspan="2">Replicate</th>
            <th colspan="3">B<sub>1</sub> (Easy)</th>
            <th colspan="3">B<sub>2</sub> (Difficult)</th>
        </tr>
        <tr>
            <th>A<sub>1</sub> (Encouraging)</th>
            <th>A<sub>2</sub> (Neutral)</th>
            <th>A<sub>3</sub> (Critical)</th>
            <th>A<sub>1</sub> (Encouraging)</th>
            <th>A<sub>2</sub> (Neutral)</th>
            <th>A<sub>3</sub> (Critical)</th>
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

??? info "Click to see grand mean, marginal means, and cell means"

    For this dataset, the cell means, marginal means, and grand mean are:

    | Feedback type | $B_1$ Easy<br>$\bar{y}_{i,1,.}$ | $B_2$ Difficult<br>$\bar{y}_{i,2,.}$ | Feedback marginal mean<br>$\bar{y}_{i,.,.}$ |
    |---|---:|---:|---:|
    | $A_1$ Encouraging | 5.00 | 25.00 | 15.00 |
    | $A_2$ Neutral | 10.00 | 10.00 | 10.00 |
    | $A_3$ Critical | 25.50 | -5.50 | 10.00 |
    | Difficulty marginal mean<br>$\bar{y}_{.,j,.}$ | 13.50 | 9.83 | $\hat{\mu}=11.67$ |

??? info "Click to view the interaction plot"
    ![Interaction plot of cell means.](https://r2.chunyi-lin.com/docs/study-notes/experiment-design-and-statistical-analysis/01_ANOVA/01_Introduction/plot1_en.svg)
    The non-parallel lines suggest that the effect of feedback type depends on task difficulty, suggesting the interaction term $(\alpha\beta)_{i,j}$ in the model.

### A Two-Way Linear Model

We want to ask the question: 

*What causes the variation in performance? Or, where does the variation come from? Is the variation meaningful, or is it just caused by some random errors?*

Now, consider each subject's score.

$$y_{i,j,k} \; (i\in\{1,2,3\},j\in\{1,2\}, k\in\{x\in\mathbb{Z}:1\leqslant x\leqslant10\})$$

What likely causes each participant's score to be different from the grand mean? 

1. Maybe the feedback type they received causes it;
2. Maybe it is due to the task difficulty they received;
3. Maybe, some specific combination of feedback type and task difficulty does something;
4. Or, the difference may simply reflect random variation between participants.

So, we can construct a model that accounts for the above four possible sources of variation.

$$
\begin{equation}
y_{i,j,k}
=
\mu+\alpha_i+\beta_j+(\alpha\beta)_{i,j}+\varepsilon_{i,j,k}
\end{equation}
$$

However, this model needs one more technical condition. As written, the parameters are not uniquely determined. For example, we could add a constant to $\mu$ and subtract the same constant from every $\alpha_i$, while leaving the predicted value unchanged.

To make the parameters identifiable, we impose the usual sum-to-zero constraints:

$$
\sum_i \alpha_i = 0,
\qquad
\sum_j \beta_j = 0,
$$

and

$$
\sum_i(\alpha\beta)_{i,j}=0
\quad\text{for every }j,
\qquad
\sum_j(\alpha\beta)_{i,j}=0
\quad\text{for every }i.
$$

Unfortunately, most of the terms above are not directly observable. We have to estimate these terms using our already available information.

$$
\begin{equation}
y_{i,j,k}
=
\hat{\mu}+\widehat{\alpha_i}+\widehat{\beta_j}+\widehat{(\alpha\beta)_{i,j}}+\widehat{\varepsilon_{i,j,k}}
\end{equation}
$$

where:

$$\hat{\mu} = \frac{1}{IJK} \sum_{i,j,k}y_{i,j,k}$$

is called the grand mean of our dependent variable $y$.

$$
\widehat{\alpha_i} = \frac{1}{JK}\sum_{j,k} (y_{i,j,k} -\hat{\mu}) = \frac{1}{JK} \sum_{j,k} y_{i,j,k} - \hat{\mu}
$$

is called the main effect of feedback type. Notice the subtraction of the grand mean. 

We do that because we want to know what feedback types do *on top of* the grand mean.

Similarly, for the main effect of task difficulty, we have:

$$
\widehat{\beta_j} = \frac{1}{IK}\sum_{i,k}(y_{i,j,k}- \hat{\mu}) = \frac{1}{IK}\sum_{i,k}y_{i,j,k}-\hat{\mu}
$$

What about the term $\widehat{(\alpha\beta)_{i,j}}$?

It is called the interaction between feedback type and task difficulty. 

$$
\widehat{(\alpha\beta)_{i,j}} = \frac{1}{K} \sum_{k} y_{i,j,k} - \hat{\mu} - \widehat{\alpha_i} - \widehat{\beta_j}
$$

We want to know what $\widehat{(\alpha\beta)_{i,j}}$ does, *on top of* $\widehat{\alpha_i}$, $\widehat{\beta_j}$ and the grand mean $\widehat{\mu}$.

And the remainder $\widehat{\varepsilon_{i,j,k}}$ is the residual error for this participant $k$ in cell $(i,j)$.

$$
\begin{aligned}
\widehat{\varepsilon_{i,j,k}} &= y_{i,j,k}-\hat{\mu} - \widehat{\alpha_i} -\widehat{\beta_j} - \widehat{(\alpha\beta)_{i,j}} \\
&= y_{i,j,k} - \hat{\mu} - \widehat{\alpha_i} - \widehat{\beta_j} - (\frac{1}{K} \sum_{k} y_{i,j,k} - \hat{\mu} - \widehat{\alpha_i} - \widehat{\beta_j}) \\
&= y_{i,j,k} - \frac{1}{K} \sum_{k} y_{i,j,k}
\end{aligned}
$$

Let

$$
\begin{gather*}
\bar{y}_{i,.,.} = \frac{1}{JK} \sum_{j,k} y_{i,j,k} \\
\bar{y}_{.,j,.} = \frac{1}{IK}\sum_{i,k}y_{i,j,k} \\
\bar{y}_{i,j,.} = \frac{1}{K} \sum_{k} y_{i,j,k}
\end{gather*}
$$

and take these back into our formerly defined model:

$$
\begin{align*}
y_{i,j,k} &= \hat\mu + (\frac{1}{JK} \sum_{j,k} y_{i,j,k} - \hat\mu) + (\frac{1}{IK}\sum_{i,k}y_{i,j,k}- \hat\mu) + [\frac{1}{K} \sum_{k} y_{i,j,k} - \hat\mu -(\frac{1}{JK} \sum_{j,k} y_{i,j,k} - \hat\mu) - (\frac{1}{IK}\sum_{i,k}y_{i,j,k}- \hat\mu)] + \varepsilon_{i,j,k} \\
y_{i,j,k} &= \hat\mu + (\bar{y}_{i,.,.} - \hat\mu) + (\bar{y}_{.,j,.} - \hat\mu) + (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) + (y_{i,j,k} - \bar{y}_{i,j,.}) \\
\end{align*}
$$

$$
\begin{equation}
y_{i,j,k} - \hat\mu = \underbrace{(\bar{y}_{i,.,.} - \hat\mu)}_{\widehat{\alpha_i}} + \underbrace{(\bar{y}_{.,j,.} - \hat\mu)}_{\widehat{\beta_j}} + \underbrace{(\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)}_{\widehat{(\alpha\beta)_{i,j}}} + \underbrace{(y_{i,j,k} - \bar{y}_{i,j,.})}_{\widehat{\varepsilon_{i,j,k}}}
\end{equation}
$$

!!! note "Why do we need these constraints?"

    The model contains redundant ways to describe the same fitted value. Without constraints, each parameter would not correspond to a unique numerical value.

    The sum-to-zero constraints choose one convenient convention that main effects are deviations from the grand mean, and interaction effects are the leftover cell deviations after the grand mean and main effects have been removed.

## From One Observation to the Whole Dataset

Previously, we described how an individual observation may be decomposed:

$$
y_{i,j,k}
=\mu+\alpha_i+\beta_j+(\alpha\beta)_{i,j}+\varepsilon_{i,j,k}.
$$

It says that one participant's score may reflect the grand mean, the effect of feedback type, the effect of task difficulty, their interaction, and residual error.

We also acknowledged that the exact value of $\mu$, $\alpha_i$, $\beta_j$, $(\alpha\beta)_{i,j}$ and $\varepsilon_{i,j,k}$ cannot be known, and we can only *estimate* these components from our existing observations.

$$
y_{i,j,k}
=
\hat{\mu}+\widehat{\alpha_i}+\widehat{\beta_j}+\widehat{(\alpha\beta)_{i,j}}+\widehat{\varepsilon_{i,j,k}}
$$

However, one cannot estimate all these components from one observation alone. One data point is not enough to pin down several unknown quantities. Therefore, the whole dataset is used to calculate grand mean, marginal means, and cell means, which are then used to estimate these components.

Let $n(i,j,k)=(i−1)JK+(j−1)K+k$,

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
\widehat{\boldsymbol{\mu}} =
\begin{bmatrix}
\hat\mu \\
\hat\mu \\
\vdots \\
\hat\mu
\end{bmatrix}_{N},\;
\widehat{\boldsymbol{\alpha}}_{n(i,j,k)} = \widehat{\alpha_i},\;
\widehat{\boldsymbol{\beta}}_{n(i,j,k)} = \widehat{\beta_j},\;
\widehat{\boldsymbol{\alpha\beta}}_{n(i,j,k)} = \widehat{(\alpha\beta)_{i,j}},\;
$$

and 

$$
\widehat{\boldsymbol{\varepsilon}}_{n(i,j,k)}=\widehat{\varepsilon_{i,j,k}}.
$$

We can now stack all $N=IJK$ observations into vectors in $\mathbb{R}^N$. The decomposition then becomes a single vector equation:

$$
\begin{equation}
\mathbf{y​}−\widehat{\boldsymbol{\mu}}​=\widehat{\boldsymbol{\alpha}}​​+\widehat{\boldsymbol{\beta}​​}+\widehat{\boldsymbol{\alpha\beta}}​​+\widehat{\boldsymbol{\varepsilon}}.
\end{equation}
$$

### Mutual Orthogonality of Fitted Vectors

As it turns out, each pair of fitted vectors here is orthogonal.

| Orthogonality | Reason |
|---|---|
| $\widehat{\boldsymbol{\alpha}}\perp\widehat{\boldsymbol{\mu}}$ | $\sum_i\widehat{\alpha_i}=0$ |
| $\widehat{\boldsymbol{\beta}}\perp\widehat{\boldsymbol{\mu}}$ | $\sum_j\widehat{\beta_j}=0$ |
| $\widehat{\boldsymbol{\alpha\beta}}\perp\widehat{\boldsymbol{\mu}}$ | $\sum_{i,j}\widehat{(\alpha\beta)_{i,j}}=0$ |
| $\widehat{\boldsymbol{\alpha}}\perp\widehat{\boldsymbol{\beta}}$ | balanced factorization|
| $\widehat{\boldsymbol{\alpha}}\perp\widehat{\boldsymbol{\alpha\beta}}$ | $\sum_j\widehat{(\alpha\beta)_{i,j}}=0$ for each $i$ |
| $\widehat{\boldsymbol{\beta}}\perp\widehat{\boldsymbol{\alpha\beta}}$ | $\sum_i\widehat{(\alpha\beta)_{i,j}}=0$ for each $j$ |
| $\widehat{\boldsymbol{\varepsilon}}\perp$ all four others | cell-wise $\sum_k\widehat{\varepsilon}_{(i,j,k)}=0$ |

The "balanced factorization" entry above hints at why these orthogonalities are not accidental. This experiment uses a **balanced factorial design**, in which every cell contains the same number of observations $K$. In the later chapters, we will have more details on what this means, and what happens when a design is not *balanced*.

### Measuring Fitted Vectors' Magnitudes

We now want a single number that summarizes the magnitude of each component vector across the whole dataset. The natural geometric measure of a vector's magnitude is its **squared Euclidean norm**:

$$\|\mathbf{v}\|^2 = \sum_{i,j,k} v_{i,j,k}^2.$$

The reason to choose squared Euclidean norm is that it interacts with orthogonality through the Pythagorean theorem:

$$\mathbf{u}\perp\mathbf{v} \Leftrightarrow \|\mathbf{u}+\mathbf{v}\|^2 = \|\mathbf{u}\|^2 + \|\mathbf{v}\|^2,$$

where $\mathbf{u}\perp\mathbf{v} \Leftrightarrow\sum_{i,j,k} u_{i,j,k}\,v_{i,j,k}=0$.

No other natural measure of vector size has this additivity (e.g. $\sum|u_i+v_i|$ is generally not $\sum|u_i|+\sum|v_i|$, even when $\mathbf{u}\perp\mathbf{v}$).

Now, we apply squared Euclidean norm on both sides of equation (4):

$$
\begin{align}
\|\mathbf{y​}−\widehat{\boldsymbol{\mu}}\|^2&​=\|\widehat{\boldsymbol{\alpha}}​​+\widehat{\boldsymbol{\beta}​​}+\widehat{\boldsymbol{\alpha\beta}}​​+\widehat{\boldsymbol{\varepsilon}}\|^2 \notag \\
&= \|\widehat{\boldsymbol{\alpha}}\|^2+\|\widehat{\boldsymbol{\beta}​​}\|^2+\|\widehat{\boldsymbol{\alpha\beta}}\|^2+\|\widehat{\boldsymbol{\varepsilon}}\|^2 + 2\langle\widehat{\boldsymbol{\alpha}},\widehat{\boldsymbol{\beta}}\rangle + 2\langle\widehat{\boldsymbol{\alpha}},\widehat{\boldsymbol{\alpha\beta}}\rangle + 2\langle\widehat{\boldsymbol{\alpha}},\widehat{\boldsymbol{\varepsilon}}\rangle \notag\\
&+2\langle\widehat{\boldsymbol{\beta}},\widehat{\boldsymbol{\alpha\beta}}\rangle +2\langle\widehat{\boldsymbol{\beta}},\widehat{\boldsymbol{\varepsilon}}\rangle +2\langle\widehat{\boldsymbol{\alpha\beta}},\widehat{\boldsymbol{\varepsilon}}\rangle\notag \\ 
&=\|\widehat{\boldsymbol{\alpha}}\|^2+\|\widehat{\boldsymbol{\beta}​​}\|^2+\|\widehat{\boldsymbol{\alpha\beta}}\|^2+\|\widehat{\boldsymbol{\varepsilon}}\|^2.
\end{align}
$$

Similarly, writing this out in entry-level form gives:

$$
\begin{align*}
\sum_{i,j,k}(y_{i,j,k} - \hat\mu)^2 &= \sum_{i,j,k}[(\bar{y}_{i,.,.} - \hat\mu) + (\bar{y}_{.,j,.} - \hat\mu) + (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) + (y_{i,j,k} - \bar{y}_{i,j,.})]^2 \notag \\
&= \sum_{i,j,k}(\bar{y}_{i,.,.} - \hat\mu)^2 + \sum_{i,j,k} (\bar{y}_{.,j,.} - \hat\mu)^2 + \sum_{i,j,k} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)^2 + \sum_{i,j,k} (y_{i,j,k} - \bar{y}_{i,j,.})^2.
\end{align*}
$$

??? info "Click to see the expansion on the right-hand side"

    $$
    \begin{align*}
    \mathrm{RHS} &=  \sum_{i,j,k}[(\bar{y}_{i,.,.} - \hat\mu) + (\bar{y}_{.,j,.} - \hat\mu) + (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) + (y_{i,j,k} - \bar{y}_{i,j,.})]^2 \\
    &= \sum_{i,j,k} [(\bar{y}_{i,.,.} - \hat\mu)^2 +  (\bar{y}_{.,j,.} - \hat\mu)^2 + (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)^2 + (y_{i,j,k} - \bar{y}_{i,j,.})^2] \\
    &+ 2\sum_{i,j,k} (\bar{y}_{i,.,.} - \hat\mu)(\bar{y}_{.,j,.} - \hat\mu)+ 2\sum_{i,j,k}(\bar{y}_{i,.,.} - \hat\mu)(\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) \\
    &+ 2\sum_{i,j,k}(\bar{y}_{i,.,.} - \hat\mu)(y_{i,j,k} - \bar{y}_{i,j,.}) + 2\sum_{i,j,k}(\bar{y}_{.,j,.} - \hat\mu) (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) \\
    &+ 2\sum_{i,j,k} (\bar{y}_{.,j,.} - \hat\mu)(y_{i,j,k} - \bar{y}_{i,j,.})+ 2\sum_{i,j,k}(\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)(y_{i,j,k} - \bar{y}_{i,j,.}) \\
    \end{align*}
    $$

    The first cross-term:

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

    The second cross-term:

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

    The third cross-term

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

    The fourth cross-term

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

    The fifth cross-term

    $$
    \begin{align*}
    2\sum_{i,j,k} (\bar{y}_{.,j,.} - \hat\mu)(y_{i,j,k} - \bar{y}_{i,j,.}) &= 2\sum_{i,j} (\bar{y}_{.,j,.} - \hat\mu) \sum_{k} (y_{i,j,k} - \bar{y}_{i,j,.}) \\
    &= 2\sum_{i,j} (\bar{y}_{.,j,.} - \hat\mu) \left( \sum_{k} y_{i,j,k} - \sum_{k} \left( \frac{1}{K}\sum_{k}y_{i,j,k} \right) \right) \\
    &= 2\sum_{i,j} (\bar{y}_{.,j,.} - \hat\mu) \left( \sum_{k} y_{i,j,k} - \sum_{k} y_{i,j,k} \right) \\
    &= 2\sum_{i,j} (\bar{y}_{.,j,.} - \hat\mu) (0) \\
    &= 0
    \end{align*}
    $$

    The sixth cross-term

    $$
    \begin{align*}
    2\sum_{i,j,k}(\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)(y_{i,j,k} - \bar{y}_{i,j,.}) &= 2\sum_{i,j} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) \sum_{k} (y_{i,j,k} - \bar{y}_{i,j,.}) \\
    &= 2\sum_{i,j} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) \left( \sum_{k} y_{i,j,k} - \sum_{k} \left( \frac{1}{K}\sum_{k}y_{i,j,k} \right) \right) \\
    &= 2\sum_{i,j} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) \left( \sum_{k} y_{i,j,k} - \sum_{k} y_{i,j,k} \right) \\
    &= 2\sum_{i,j} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu) (0) \\
    &= 0
    \end{align*}
    $$

Let

$$
\begin{gather*}
\mathrm{SS_T} = \|\mathbf{y​}−\widehat{\boldsymbol{\mu}}\|^2 = \sum_{i,j,k}(y_{i,j,k}-\hat\mu)^2 \\
\mathrm{SS_A} = \|\widehat{\boldsymbol{\alpha}}\|^2 = \sum_{i,j,k}(\bar{y}_{i,.,.} - \hat\mu)^2 \\
\mathrm{SS_B} = \|\widehat{\boldsymbol{\beta}​​}\|^2 = \sum_{i,j,k} (\bar{y}_{.,j,.} - \hat\mu)^2 \\
\mathrm{SS_{A\times B}} = \|\widehat{\boldsymbol{\alpha\beta}}\|^2 = \sum_{i,j,k} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)^2 \\
\mathrm{SS_E} = \|\widehat{\boldsymbol{\varepsilon}}\|^2 = \sum_{i,j,k} (y_{i,j,k} - \bar{y}_{i,j,.})^2 
\end{gather*}
$$

We now obtain the classic SS formula for this experiment:

$$
\begin{equation}
\mathrm{SS_T} = \mathrm{SS_A} + \mathrm{SS_B} + \mathrm{SS_{A\times B}} + \mathrm{SS_E}
\end{equation}
$$

In many textbooks, however, sums of squares are calculated using a shortcut called the *bracket form*.

??? info "Calculate sums of squares by hand using the bracket form"

    Let

    $$
    T_{i,j,.}=\sum_k y_{i,j,k}
    $$

    be the total score in cell $(i,j)$,

    $$
    T_{i,.,.}=\sum_{j,k}y_{i,j,k}
    $$

    be the total score for feedback level $i$,

    $$
    T_{.,j,.}=\sum_{i,k}y_{i,j,k}
    $$

    be the total score for difficulty level $j$,

    and

    $$
    T_{.,.,.}=\sum_{i,j,k}y_{i,j,k}
    $$

    be the grand total.

    First, the total sum of squares:

    $$
    \mathrm{SS_T}
    =
    \sum_{i,j,k}(y_{i,j,k}-\hat\mu)^2.
    $$

    Expanding the square:

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

    We have

    $$
    IJK\hat\mu^2
    =
    IJK\left(\frac{T_{.,.,.}}{IJK}\right)^2
    =
    \frac{T_{.,.,.}^2}{IJK}.
    $$

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

    Let $C = \frac{T_{.,.,.}^2}{IJK}$. We call C "the correction term".

    $$
    \mathrm{SS_T}
    =
    \sum_{i,j,k}y_{i,j,k}^2-C.
    $$

    Now consider $\mathrm{SS_A}$:

    $$
    \begin{align*}
    \mathrm{SS_A}
    &=
    \sum_{i,j,k}(\bar y_{i,.,.}-\hat\mu)^2 \\
    &=
    JK\sum_i(\bar y_{i,.,.}-\hat\mu)^2.
    \end{align*}
    $$

    Since

    $$
    \bar y_{i,.,.}=\frac{T_{i,.,.}}{JK},
    \qquad
    \hat\mu=\frac{T_{.,.,.}}{IJK},
    $$

    expanding and simplifying gives

    $$
    \mathrm{SS_A}
    =
    \sum_i\frac{T_{i,.,.}^2}{JK}
    -
    \frac{T_{.,.,.}^2}{IJK}.
    $$

    Hence,

    $$
    \mathrm{SS_A}
    =
    \sum_i\frac{T_{i,.,.}^2}{JK}
    -
    C.
    $$

    Similarly,

    $$
    \mathrm{SS_B}
    =
    \sum_j\frac{T_{.,j,.}^2}{IK}
    -
    C.
    $$

    Now consider the interaction sum of squares:

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

    Expanding and simplifying gives

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

    Now rewrite each mean using its corresponding total:

    $$
    \bar y_{i,j,.}=\frac{T_{i,j,.}}{K},
    \qquad
    \bar y_{i,.,.}=\frac{T_{i,.,.}}{JK},
    \qquad
    \bar y_{.,j,.}=\frac{T_{.,j,.}}{IK},
    \qquad
    \hat\mu=\frac{T_{.,.,.}}{IJK}.
    $$

    Therefore,

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

    Notice an intermediate quantity:

    $$
    \sum_{i,j}\frac{T_{i,j,.}^2}{K}-C.
    $$

    In many textbooks this is called the **cell sum of squares**:

    $$
    \mathrm{SS_{cell}}
    =
    \sum_{i,j}\frac{T_{i,j,.}^2}{K}-C.
    $$

    Using this notation,

    $$
    \mathrm{SS_{A\times B}}
    =
    \mathrm{SS_{cell}}
    -
    \mathrm{SS_A}
    -
    \mathrm{SS_B}.
    $$

    Finally, the residual sum of squares is the sum of squared deviations from the cell means:

    $$
    \mathrm{SS_E}
    =
    \sum_{i,j,k}(y_{i,j,k}-\bar y_{i,j,.})^2.
    $$

    Expanding within each cell gives

    $$
    \mathrm{SS_E}
    =
    \sum_{i,j,k}y_{i,j,k}^2
    -
    \sum_{i,j}\frac{T_{i,j,.}^2}{K}.
    $$

    People also calculate $\mathrm{SS_E}$ by the following formula for convenience:

    $$
    \mathrm{SS_E} = \mathrm{SS_T} - \mathrm{SS_A} - \mathrm{SS_B} - \mathrm{SS_{A\times B}}
    $$

    In short:

    For this *balanced two-way design*, define the correction term:

    $$
    C=\frac{T_{.,.,.}^2}{IJK}.
    $$

    Then calculate the sums of squares in this order:

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

    Equivalently,

    $$
    \mathrm{SS_E}
    =
    \sum_{i,j,k}y_{i,j,k}^2
    -
    \sum_{i,j}\frac{T_{i,j,.}^2}{K}.
    $$

## Section Review

We started by asking where the variation in performance comes from.

We have now decomposed each centered observation into four parts:

$$
y_{i,j,k}-\hat\mu
=
\widehat{\alpha_i}
+
\widehat{\beta_j}
+
\widehat{(\alpha\beta)_{i,j}}
+
\widehat{\varepsilon_{i,j,k}}.
$$

Each participant's deviation from the grand mean is decomposed into a feedback component, a difficulty component, an interaction component, and a residual component.

Because these four fitted component vectors are orthogonal in this balanced design, the observation-level decomposition results in a clean partition of total sum of squares:

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

What we cannot say yet is whether any one of these pieces is *large enough* relative to $\mathrm{SS_E}$.

For that, we need to know how these quantities behave under sampling.

In the next section, we will address that by introducing degrees of freedom, mean squares, and the $F$ statistic.
