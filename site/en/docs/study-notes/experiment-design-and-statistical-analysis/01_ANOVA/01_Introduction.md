# Introduction: Decomposing an Observation

R. A. Fisher (1926):
> No aphorism is more frequently repeated in connection with field trials, than that we must ask Nature few questions, or, ideally, one question, at a time. The writer is convinced that this view is wholly mistaken. Nature, he suggests, will best respond to a logical and carefully thought out questionnaire; indeed, if we ask her a single question, she will often refuse to answer until some other topic has been discussed.[^fisher1926]

This section follows Fisher's idea through a small two-factor example. 

We ask several related questions within the same design. We ask how each factor contributes to the observed outcome, and we also ask whether the contribution of one factor changes across the levels of the other.

Mathematically, this means that one observation will be decomposed into several fitted components: a grand level, two main-effect components, an interaction component, and a residual.

## An Example

### Design and Raw Data

Suppose we want to study how feedback type ($A_1$ encouraging, $A_2$ neutral, $A_3$ critical) and task difficulty ($B_1$ easy and $B_2$ difficult) influence participants' task performance in a psychological experiment.

Participants first complete a baseline task, then receive one of three feedback types $A_i \;(i\in\{1,2,3\})$. After that they perform a task of difficulty $B_j \; (j\in\{1,2\})$

The dependent variable $y$ is participants' task performance measured by accuracy and time used, subtract their baseline task performance measured by the same metrics. 

$$
y=\text{post-feedback performance}-\text{baseline performance}.
$$

For this example, assume accuracy and time used have already been combined into one standardized performance score, where larger values indicate greater improvement.

Each feedback $\times$ difficulty condition contains 10 participants.

The results are as follows.

??? info "The result table"
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

??? info "Grand mean, marginal means, and cell means"

    For this dataset, the cell means, marginal means, and grand mean are:

    | Feedback type | $B_1$ Easy<br>$\bar{y}_{i,1,.}$ | $B_2$ Difficult<br>$\bar{y}_{i,2,.}$ | Feedback marginal mean<br>$\bar{y}_{i,.,.}$ |
    |---|---:|---:|---:|
    | $A_1$ Encouraging | $5.00$ | $25.00$ | $15.00$ |
    | $A_2$ Neutral | $10.00$ | $10.00$ | $10.00$ |
    | $A_3$ Critical | $25.50$ | $-5.50$ | $10.00$ |
    | Difficulty marginal mean<br>$\bar{y}_{.,j,.}$ | $13.50$ | $9.83$ | $\hat{\mu}=11.67$ |

??? info "The interaction plot"
    ![Interaction plot of cell means.](https://r2.chunyi-lin.com/docs/study-notes/experiment-design-and-statistical-analysis/01_ANOVA/01_Introduction/plot1_en.svg)

!!! note

    The values in our example data are computer generated for illustrative purposes only.

### From Data to a Model

Up to this point, $y_{i,j,k} \; (i\in\{1,2,3\},j\in\{1,2\}, k\in\{x\in\mathbb{Z}:1\leqslant x\leqslant10\})$
 is just a number, and we have 60 of them in a table. 

If we want to claim anything beyond the number itself, we need to propose some structure that we believe the data conforms to. That is, we need a model to explain our data.

The strongest possible "model" would simply reproduce every observed value exactly.

$$
y_{i,j,k} = y_{i,j,k}.
$$

But that would explain nothing beyond the table itself. 

Therefore, a more usable model could be more restrictive.  

Suppose we believe that some variables $t_1,t_2,\ldots$ matter for the observation. Then a model gives a predicted value

$$
h(t_1,t_2,\ldots).
$$

If the model were perfect, we would have

$$
y_{i,j,k}=h(t_1,t_2,\ldots).
$$

But in reality, that is almost always impossible. In our example, two participants in the same experimental condition $(i,j)$ may still obtain different scores.

The same participant might also perform slightly differently if the experiment were repeated. 
 
Some of this variation may come from measurement noise, individual differences, uncontrolled conditions, etc. There are variables we have not included in the model.

Someone might say, why don't we just include more variables? In theory, we can. We can include in the model the gender of the participants, their favorite food, their preferred colors, the temperature of the experiment site, ... and the list goes on forever.

Therefore, a useful model needs to be more selective. It keeps only the part of the observation that we believe is systematic, and leaves the remaining part unexplained.

Such a model expresses each observation as a structured part plus a leftover:

$$
y_{i,j,k} = h(t_1, t_2, \ldots) + \varepsilon_{i,j,k}.
$$

Here $h$ is a function of whatever variables we suspect matter, and $\varepsilon_{i,j,k}$, called the residual, is the leftover $h$ does not explain.

Therefore, choosing $h$ is choosing a story about the systematic part of the data-generating processes.

Someone might again ask: why additive errors, not multiplicative, or some other more complex combinations of $h$ and $\varepsilon_{i,j,k}$?

The thing is, we don't know. This is just a modeling convention. No physical laws in this world require all errors to be additive.

It turns out that other error forms are indeed possible. If the deviation is proportional to the predicted value, a multiplicative model may be more appropriate:

$$
y_{i,j,k}=h(t_1,t_2,\ldots)\varepsilon_{i,j,k}.
$$

However, if we take logs on both sides:

$$
\begin{align*}
\ln y_{i,j,k}&=\ln[h(t_1,t_2,\ldots)\varepsilon_{i,j,k}]\\
&=\ln h(t_1,t_2,\ldots) + \ln \varepsilon_{i,j,k}
\end{align*},
$$

the error again becomes additive. This shows that the apparent form of the error depends partly on the scale we choose to use. A model that looks multiplicative on the original scale may look additive on the logarithmic scale.

Therefore, writing

$$
y_{i,j,k} = h(t_1,t_2,\ldots)+\varepsilon_{i,j,k}
$$

is not really claiming that the world must literally add error to signal. 

But more like: on the current scale, once the model gives a predicted value $h(t_1,t_2,\ldots)$, we describe the model's *failure* by the difference

$$
\varepsilon_{i,j,k}
=
y_{i,j,k}-h(t_1,t_2,\ldots).
$$

The additive form is therefore a way of representing residuals on our chosen scale.

However, later when we treat $\varepsilon_{i,j,k}$ as a random variable, we are making a stronger claim that this leftover behaves in a simple and stable way on this scale. 

For example, in the usual normal-error model, we assume

$$
\varepsilon_{i,j,k}\overset{\mathrm{i.i.d.}}{\sim}\mathcal{N}(0,\sigma^2).
$$

It says that, after the systematic structure $h(t_1,t_2,\ldots)$ has been removed, the residual errors are assumed to be independent, normally distributed, centered at zero, and to have the same variance in every condition.

In this section however, we will not touch this stronger claim yet. We will start with the additive representation because it gives us a clear way to measure model failure. Once residuals are written as differences, we can ask how large those differences are across the whole dataset.

### A Two-way Linear Model

Once we have decided to represent residuals as differences on the current scale, we need to think about the systematic structure $h(t_1,t_2,\ldots)$ itself.

The simplest story is that nothing matters:

$$
y_{i,j,k} = \mu + \varepsilon_{i,j,k}.
$$

Every observation comes from a single underlying value $\mu$, and any deviation is noise. 

This is almost certainly wrong here. We manipulated feedback and difficulty precisely because we expected them to shift performance, but it is still useful as a baseline against which richer or *fuller* models can be compared.

Then, if feedback matters,

$$
y_{i,j,k} = \mu + \alpha_i + \varepsilon_{i,j,k}.
$$

If difficulty matters too,

$$
y_{i,j,k} = \mu + \alpha_i + \beta_j + \varepsilon_{i,j,k}.
$$

If the effect of feedback depends on difficulty (or vice versa),

$$
y_{i,j,k}
=
\mu+\alpha_i+\beta_j+(\alpha\beta)_{i,j}+\varepsilon_{i,j,k}
$$

This last form is the model we will work with in this section. We could keep going by adding subject-specific intercepts, or by letting the interaction take a non-additive shape, but for now we stop here. 

Each additional component tells a more elaborate story at the cost of more parameters fitted from the same data.

??? info "Interaction terms with more factors"

    The two-way model contains one interaction term:

    $$
    (\alpha\beta)_{i,j}.
    $$

    This term represents the part of the cell mean that cannot be explained by simply adding the feedback contribution $\alpha_i$ and the difficulty contribution $\beta_j$.

    If we had three factors, say $A_i$, $B_j$, and $C_\ell$, the full factorial linear model would become

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

    The terms have different roles:

    $$
    \begin{aligned}
    \alpha_i,\beta_j,\gamma_\ell
    &\quad \text{main effects},\\
    (\alpha\beta)_{i,j},(\alpha\gamma)_{i,\ell},(\beta\gamma)_{j,\ell}
    &\quad \text{two-way interactions},\\
    (\alpha\beta\gamma)_{i,j,\ell}
    &\quad \text{three-way interaction}.
    \end{aligned}
    $$

    A two-way interaction means that the effect of one factor depends on the level of another factor.

    A three-way interaction means that a two-way interaction itself depends on the level of a third factor.

    In general, with $N$ factors, a full factorial model contains every possible non-empty combination of factors: all main effects, all two-way interactions, all three-way interactions, and so on, up to the $N$-way interaction.

    For example, with $N$ factors, the number of possible non-empty terms is

    $$
    {N \choose 1}+{N \choose 2}+\cdots+{N \choose N}
    =
    2^N-1.
    $$

    This is why factorial models can grow quickly. A full model is expressive, but it also becomes harder to estimate, harder to interpret, and most importantly, easier to overfit.

Now, every component in the model above enters additively. No parameter multiplies, divides, or transforms another. Therefore, the model is *linear* in its parameters.

Again, linearity is a choice we are making, i.e., a modeling assumption.

The universe does not privilege linear models. There is no a priori reason that the change in performance should equal a sum of a feedback term, a difficulty term, and an interaction term, rather than a product, a ratio, a piecewise function, or something stranger.

We use linear models here for two practical reasons. First, they are simple. Second, despite their simplicity, linear models often work well enough. Many quantities studied in psychology and the social sciences are reasonably well approximated by additive combinations of effects within the range of conditions actually tested.

When the linear approximation breaks however, different tools become necessary. Transformations, generalized linear models, nonlinear regression, mixed models, ..., some of which will appear in later chapters. 

For now, linearity is our working assumption.

Now, with our model in place, we can now finally ask the questions that motivated the experiment:

*What causes the variation in performance? Or, where does the variation come from? Is the variation meaningful, or is it just caused by some random error?*

We formally write our model as 

$$
\mathcal{M}_F:
Y_{i,j,k}
=
\mu+\alpha_i+\beta_j+(\alpha\beta)_{i,j}+\varepsilon_{i,j,k}.
$$

Here, random variable $Y_{i,j,k}$ denotes the random score that would be generated by the model. Once data are observed, we write the observed value as $y_{i,j,k}$. The subscript $F$ means this model is the full model.

However, this model needs one more technical condition. As written, the parameters are not uniquely determined.

For example, the same predicted value can be obtained by adding a constant to $\mu$ and subtracting the same constant from every $\alpha_i$. Therefore, the numerical values of $\mu$ and $\alpha_i$ are not uniquely defined unless we impose a convention.

A common convention is to use sum-to-zero constraints:

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

Under these constraints, $\mu$ becomes the grand mean, the main-effect parameters describe deviations from the grand mean, and the interaction parameters describe deviations from additivity.

However, the parameters of $\mathcal{M}_F$ above are not directly observable. The table gives us only the observed values $y_{i,j,k}$, rather than $\mu$, $\alpha_i$, $\beta_j$, $(\alpha\beta)_{i,j}$, or $\varepsilon_{i,j,k}$. 

Among all possible parameter values, which ones should we choose?

We need a way to *estimate* these parameters. 

### Estimating the Parameters by Least Squares

One way to estimate the parameters is to choose parameter values

$$
\theta
=
\left(
\mu,
\alpha_i,
\beta_j,
(\alpha\beta)_{i,j}
\right)
$$

that make the model fit the data as closely as possible.

For a candidate parameter value $\theta$, the model gives the predicted value

$$
y^{(\mathcal{M}_F)}_{i,j,k}(\theta)
=
\mu+\alpha_i+\beta_j+(\alpha\beta)_{i,j}.
$$

We choose the parameter values by minimizing the total loss:

$$
\min_{\theta}
\sum_{i,j,k}
f\left(
y^{(\mathcal{M}_F)}_{i,j,k}(\theta),
y_{i,j,k}
\right).
$$

Notice that we use summation here. The reason is that, (1) one data point cannot pin down all four unknown parameters here, and (2) that we need a model that can at least *reasonably* explain all the data we have.

Different choices of $f$ produce different estimators with different properties. In this chapter, we will use a loss function that uses squared error, where $f$ is simply defined as:

$$
f(x,y)=(x-y)^2,
$$

and we have 

$$
\mathrm{SSE}(\theta;\mathcal{M}_F) = \sum_{i,j,k} \left(y_{i,j,k} - y^{(\mathcal{M}_F)}_{i,j,k}(\theta)\right)^2,
$$

where SSE means "sum of squared errors".

Therefore, we want to find

$$
\hat{{\theta}} =\left({\hat\mu}, \hat{\alpha}_i, \hat{\beta}_j, \widehat{(\alpha\beta)}_{i,j}\right) =  \operatorname*{arg\,min}_{{{\theta}}} \sum_{i,j,k} \left(y_{i,j,k} - y^{(\mathcal{M}_F)}_{i,j,k}(\theta)
\right)^2.
$$

Now, before we move on, let 

$$
\begin{gather*}
\bar{y}_{.,.,.} = \frac{1}{IJK} \sum_{i,j,k} y_{i,j,k} \\
\bar{y}_{i,.,.} = \frac{1}{JK} \sum_{j,k} y_{i,j,k} \\
\bar{y}_{.,j,.} = \frac{1}{IK}\sum_{i,k}y_{i,j,k} \\
\bar{y}_{i,j,.} = \frac{1}{K} \sum_{k} y_{i,j,k}
\end{gather*}
$$

??? info "The derivation of estimators"

    In this derivation, $\mu$, $\alpha_i$, $\beta_j$, and $(\alpha\beta)_{i,j}$ denote candidate parameter values. After solving the equations, the resulting estimators are written with hats.

    To find the estimators under the full model $\mathcal{M}_F$, we want to minimize the Sum of Squared Errors

    $$\mathrm{SSE}(\theta; \mathcal{M}_F)
    =
    \sum_{i,j,k}
    \left(
    y_{i,j,k}
    -
    \mu
    -
    \alpha_i
    -
    \beta_j
    -
    (\alpha\beta)_{i,j}
    \right)^2
    $$

    Subject to the standard sum-to-zero constraints:

    $$
    \sum_i \alpha_i = 0 \,\quad
    \sum_j \beta_j = 0 \,\quad
    \sum_i (\alpha\beta)_{i,j} = 0 \text{ for every }j \,\quad
    \sum_j (\alpha\beta)_{i,j} = 0 \text{ for every }i.
    $$

    To enforce these constraints during minimization, we use Lagrange multipliers. We construct a new function, the Lagrangian $\mathcal{L}$, by adding our constraints to the objective function. We assign a unique multiplier to each constraint.

    Let $\lambda^{(\alpha)}$ and $\lambda^{(\beta)}$ be the multipliers for the main effect constraints. Let $\gamma_j$ and $\tau_i$ be the multipliers for the interaction constraints. The Lagrangian is:

    $$
    \mathcal{L} = \sum_{i,j,k} \left( y_{i,j,k} - \mu - \alpha_i - \beta_j - (\alpha\beta)_{i,j} \right)^2 + 2\lambda^{(\alpha)} \sum_i \alpha_i + 2\lambda^{(\beta)} \sum_j \beta_j + 2\sum_j \gamma_j \left( \sum_i (\alpha\beta)_{i,j} \right) + 2\sum_i \tau_i \left( \sum_j (\alpha\beta)_{i,j} \right)
    $$

    To find the minimum, we take the partial derivative of $\mathcal{L}$ with respect to each parameter, set it to zero, and solve.

    First, let's estimate $\mu$.

    Take the partial derivative of $\mathcal{L}$with respect to $\mu$. Notice that $\mu$ does not appear in any of the constraint terms, so the multipliers drop out immediately:

    $$
    \frac{\partial \mathcal{L}}{\partial \mu} = -2 \sum_{i,j,k} \left(y_{i,j,k} - \mu - \alpha_i - \beta_j - (\alpha\beta)_{i,j}\right) = 0
    $$

    Divide by $-2$ and distribute the summations:

    $$
    \sum_{i,j,k} y_{i,j,k} - IJK\mu - JK\sum_{i} \alpha_i - IK\sum_{j} \beta_j - K\sum_{i,j} (\alpha\beta)_{i,j} = 0
    $$

    Because our constraints strictly dictate that $\sum_i \alpha_i$ = 0, $\sum_j \beta_j = 0$, and $\sum_{i,j} (\alpha\beta)_{i,j}$ = 0, all those terms evaluate to zero:

    $$
    \sum_{i,j,k} y_{i,j,k} - IJK\mu = 0 \implies \hat{\mu} = \frac{\sum_{i,j,k} y_{i,j,k}}{IJK} = \bar{y}_{.,.,.}
    $$

    Now, we estimate $\alpha_i$.

    Take the partial derivative of $\mathcal{L}$ with respect to a specific $\alpha_i$. This time, $\alpha_i$ appears in the penalty term $2\lambda^{(\alpha)} \sum_i \alpha_i$, so the multiplier remains:

    $$
    \frac{\partial \mathcal{L}}{\partial \alpha_i} = -2 \sum_{j,k} \left(y_{i,j,k} - \mu - \alpha_i - \beta_j - (\alpha\beta)_{i,j}\right) + 2\lambda^{(\alpha)} = 0
    $$

    Divide by $-2$ and distribute the summations:

    $$
    \sum_{j,k} y_{i,j,k} - JK\mu - JK\alpha_i - K\sum_{j} \beta_j - K\sum_{j} (\alpha\beta)_{i,j} - \lambda^{(\alpha)} = 0
    $$

    Applying the constraints $\sum_j \beta_j = 0$ and $\sum_j (\alpha\beta)_{i,j} = 0$, the equation simplifies to:

    $$
    \sum_{j,k} y_{i,j,k} - JK\mu - JK\alpha_i - \lambda^{(\alpha)} = 0
    $$

    How do we find $\lambda^{(\alpha)}$? We can solve for it by summing the entire equation over all $I$ levels of $i$:

    $$
    \sum_{i} \left(\sum_{j,k} y_{i,j,k} - JK\mu - JK\alpha_i - \lambda^{(\alpha)} \right) = 0
    $$

    $$
    \sum_{i,j,k} y_{i,j,k} - IJK\mu - JK\sum_i \alpha_i - I\lambda^{(\alpha)} = 0
    $$

    We already know $\sum_i \alpha_i = 0$. Furthermore, we know $\sum_{i,j,k} y_{i,j,k} - IJK\mu = 0$. Therefore, those terms cancel out, leaving us with:

    $$
    - I\lambda^{(\alpha)} = 0 \implies \lambda^{(\alpha)} = 0
    $$

    Because the multiplier is zero, we can remove it from our earlier equation:

    $$
    \sum_{i,j} y_{i,j,k} - JK\mu - JK\alpha_i = 0
    $$

    Divide by $JK$ and substitute $\mu$ with $\bar{y}_{.,.,.}$:

    $$
    \bar{y}_{i,.,.} - \bar{y}_{.,.,.} - \alpha_i = 0 \implies \hat{\alpha}_i = \bar{y}_{i,.,.} - \bar{y}_{.,.,.}
    $$

    Now, for $\beta_j$.

    Following the exact same logic, we take the partial derivative of $\mathcal{L}$ with respect to a specific $\beta_j$:

    $$
    \frac{\partial \mathcal{L}}{\partial \beta_j} = -2 \sum_{i,k} \left(y_{i,j,k} - \mu - \alpha_i - \beta_j - (\alpha\beta)_{i,j}\right) + 2\lambda^{(\beta)} = 0
    $$

    Dividing by $-2$ and applying the constraints $\sum_i \alpha_i = 0$ and $\sum_i (\alpha\beta)_{i,j} = 0$ yields:

    $$
    \sum_{i,k} y_{i,j,k} - IK\mu - IK\beta_j - \lambda^{(\beta)} = 0
    $$

    Summing this equation over all $J$ levels of $j$ reveals that $\lambda^{(\beta)} = 0$. Removing the multiplier and dividing by $IK$ leaves us with:

    $$
    \bar{y}_{.,j,.} - \bar{y}_{.,.,.} - \beta_j = 0 \implies \hat{\beta}_j = \bar{y}_{.,j,.} - \bar{y}_{.,.,.}
    $$

    Finally, for $(\alpha\beta)_{i,j}$, take the partial derivative of $\mathcal{L}$ with respect to a specific interaction cell $(\alpha\beta)_{i,j}$. 

    This parameter appears in two penalty constraints, so both multipliers ($\gamma_j$ and $\tau_i$) appear:

    $$
    \frac{\partial \mathcal{L}}{\partial (\alpha\beta)_{i,j}} = -2 \sum_{k} \left(y_{i,j,k} - \mu - \alpha_i - \beta_j - (\alpha\beta)_{i,j}\right) + 2\gamma_j + 2\tau_i = 0
    $$

    Divide by $-2$ and distribute the summation over the $K$ participants in that specific cell:

    $$
    \sum_{k} y_{i,j,k} - K\mu - K\alpha_i - K\beta_j - K(\alpha\beta)_{i,j} - \gamma_j - \tau_i = 0
    $$

    To handle the multipliers, we sum this equation first over $i$, and then over $j$.
    First, summing over $i$:

    $$
    \sum_i \sum_{k} y_{i,j,k} - IK\mu - K\sum_i \alpha_i - IK\beta_j - K\sum_i (\alpha\beta)_{i,j} - \sum_i \gamma_j - \sum_i \tau_i = 0
    $$

    Applying the constraints $\sum_i \alpha_i = 0$ and $\sum_i (\alpha\beta)_{i,j} = 0$, we get:

    $$
    \sum_{i,k} y_{i,j,k} - IK\mu - IK\beta_j - I\gamma_j - \sum_i \tau_i = 0
    $$

    Notice that the first three terms ($\sum_{i,k} y_{i,j,k} - IK\mu - IK\beta_j$) exactly equal the equation from what we have done in $\beta_j$, which evaluated to 0. Therefore:

    $$
    - I\gamma_j - \sum_i \tau_i = 0 \implies I\gamma_j + \sum_i \tau_i = 0
    $$

    Similarly, summing the original cell equation over $j$ yields:

    $$
    \sum_j \gamma_j + J\tau_i = 0
    $$

    Let $S_\gamma = \sum_j \gamma_j$ and $S_\tau = \sum_i \tau_i$. Our two equations tell us that $\gamma_j = -S_\tau / I$ (meaning $\gamma_j$ is a constant, independent of $j$) and $\tau_i = -S_\gamma / J$ (meaning $\tau_i$ is a constant, independent of $i$). Because they are constants, they balance each other out: $\gamma_j$ + $\tau_i = 0$ for every cell.

    With the multipliers zeroed out, we return to our cell equation:

    $$
    \sum_{k} y_{i,j,k} - K\mu - K\alpha_i - K\beta_j - K(\alpha\beta)_{i,j} = 0
    $$

    Divide by $K$ to convert the cell total to a cell mean:

    $$
    \bar{y}_{i,j,.} - \mu - \alpha_i - \beta_j - (\alpha\beta)_{i,j} = 0
    $$

    Now, substitute the previously found estimators for $\mu$, $\alpha_i$, and $\beta_j$:

    $$
    \begin{align*}
    \widehat{(\alpha\beta)}_{i,j} &= \bar{y}_{i,j,.} - \bar{y}_{.,.,.} - (\bar{y}_{i,.,.} - \bar{y}_{.,.,.}) - (\bar{y}_{.,j,.} - \bar{y}_{.,.,.}) \\
    &= \bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \bar{y}_{.,.,.}
    \end{align*}
    $$

In short:

$$
\begin{gather*}
\hat{\mu} = \bar{y}_{.,.,.} \\
\hat{\alpha}_i = \bar{y}_{i,.,.} - \bar{y}_{.,.,.} \\
\hat{\beta}_j = \bar{y}_{.,j,.} - \bar{y}_{.,.,.} \\
\widehat{(\alpha\beta)}_{i,j} = \bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \bar{y}_{.,.,.}
\end{gather*}
$$

And now the remainder $\hat{\varepsilon}_{i,j,k}$ 

$$
\begin{aligned}
\hat{\varepsilon}_{i,j,k} &= y_{i,j,k} - \hat{y}^{(\mathcal{M}_F)}_{i,j,k}\\
&=y_{i,j,k}-\hat{\mu} - \hat{\alpha}_i -\hat{\beta}_j - \widehat{(\alpha\beta)}_{i,j} \\
&= y_{i,j,k} - \hat{\mu} - \hat{\alpha}_i - \hat{\beta}_j - (\bar{y}_{i,j,.} - \hat{\mu} - \hat{\alpha}_i - \hat{\beta}_j) \\
&= y_{i,j,k} - \bar{y}_{i,j,.}
\end{aligned}
$$

and take these back into our formerly defined model $\mathcal{M}_F$:

$$
\begin{align*}
y_{i,j,k} &= \bar{y}_{.,.,.} + (\bar{y}_{i,.,.} - \bar{y}_{.,.,.}) + (\bar{y}_{.,j,.} - \bar{y}_{.,.,.}) + (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \bar{y}_{.,.,.}) + (y_{i,j,k} - \bar{y}_{i,j,.}) \\
y_{i,j,k} - \bar{y}_{.,.,.} &= \underbrace{(\bar{y}_{i,.,.} - \bar{y}_{.,.,.})}_{\hat{\alpha}_i} + \underbrace{(\bar{y}_{.,j,.} - \bar{y}_{.,.,.})}_{\hat{\beta}_j} + \underbrace{(\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \bar{y}_{.,.,.})}_{\widehat{(\alpha\beta)}_{i,j}} + \underbrace{(y_{i,j,k} - \bar{y}_{i,j,.})}_{\hat{\varepsilon}_{i,j,k}}
\end{align*}
$$

### Interpreting the Fitted Components

The grand mean,

$$
\hat{\mu}
=
\bar{y}_{.,.,.},
$$

is the overall fitted level of the dataset.

The feedback effect,

$$
\hat{\alpha}_i
=
\bar{y}_{i,.,.}
-
\bar{y}_{.,.,.},
$$

is the deviation of feedback level $i$ from the grand mean. It captures far that feedback level is above or below the overall average.

Similarly,

$$
\hat{\beta}_j
=
\bar{y}_{.,j,.}
-
\bar{y}_{.,.,.},
$$

is the deviation of difficulty level $j$ from the grand mean.

The interaction term,

$$
\widehat{(\alpha\beta)}_{i,j}
=
\bar{y}_{i,j,.}
-
\bar{y}_{i,.,.}
-
\bar{y}_{.,j,.}
+
\bar{y}_{.,.,.},
$$

is the cell-specific leftover after the grand mean, the feedback main effect, and the difficulty main effect have already been accounted for.

Finally,

$$
\hat{\varepsilon}_{i,j,k}
=
y_{i,j,k}
-
\bar{y}_{i,j,.},
$$

is the participant-specific leftover within cell $(i,j)$.


## Vectorizing Our Decomposition

Now, we stack all $N=IJK$ observations into vectors in $\mathbb{R}^N$. 

Let $n(i,j,k)=(i-1)JK+(j-1)K+k$,

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

and 

$$
\hat{\boldsymbol{\varepsilon}}_{n(i,j,k)}=\hat{\varepsilon}_{i,j,k}.
$$

Let

$$
\mathbf{m}
=
\boldsymbol{\mu}
+
\boldsymbol{\alpha}
+
\boldsymbol{\beta}
+
\boldsymbol{\alpha\beta},
$$

where each component vector has length $N$.

In vector notation, $\mathcal{M}_F$ determines a set of fitted vectors, i.e., all vectors that can be produced by some choice of $\mu$, $\alpha_i$, $\beta_j$, and $(\alpha\beta)_{i,j}$ satisfying the sum-to-zero constraints.

We call this set the model space of the full model and denote it by $\mathcal{S}_F$:

$$
\mathcal{S}_F
=
\left\{
\mathbf{m}\in\mathbb{R}^N:
m_{n(i,j,k)}
=
\mu+\alpha_i+\beta_j+(\alpha\beta)_{i,j}
\text{ for all } i,j,k,
\;
\sum_i\alpha_i=0,
\;
\sum_j\beta_j=0,
\;
\sum_i(\alpha\beta)_{i,j}=0
\text{ for every }j,
\;
\sum_j(\alpha\beta)_{i,j}=0
\text{ for every }i
\right\}.
$$

For any candidate fitted vector $\mathbf{m}\in\mathcal{S}_F$, the squared-error loss is

$$
L(\mathbf{m})
=
\|\mathbf{y}-\mathbf{m}\|^2.
$$

Least squares chooses

$$
\hat{\mathbf{y}}
=
\operatorname*{arg\,min}_{\mathbf{m}\in\mathcal{S}_F}
\|\mathbf{y}-\mathbf{m}\|^2.
$$

After fitting, the residual sum of squares of the full model is

$$
\mathrm{SSE}(\hat{\theta}^{(\mathcal{M}_F)};\mathcal{M}_F)
=
\|\mathbf{y}-\hat{\mathbf{y}}\|^2.
$$

In words, among all fitted vectors allowed by the model, least squares chooses the one closest to the observed data vector.

### Orthogonality of Components

First, consider the residual vector

$$
\hat{\boldsymbol{\varepsilon}}
=
\mathbf{y}-\hat{\mathbf{y}}.
$$

Least squares chooses $\widehat{\mathbf{y}}$ as the fitted-value vector in $\mathcal{S}_F$ that is closest to the observed data vector $\mathbf{y}$.

Intuitively, this means the residual cannot still contain a direction that the full model is able to fit. If it did, then we could move $\hat{\mathbf{y}}$ slightly in that direction and reduce the residual length.

Therefore, the residual vector is orthogonal to the full fitted-value space:

$$
\hat{\boldsymbol{\varepsilon}}
\perp
\mathcal{S}_F.
$$

Since $\hat{\boldsymbol{\mu}}$, $\hat{\boldsymbol{\alpha}}$, $\hat{\boldsymbol{\beta}}$, and $\widehat{\boldsymbol{\alpha\beta}}$ are all vectors in $\mathcal{S}_F$, the residual is orthogonal to each of them:

$$
\hat{\boldsymbol{\varepsilon}}
\perp
\hat{\boldsymbol{\mu}},
\qquad
\hat{\boldsymbol{\varepsilon}}
\perp
\hat{\boldsymbol{\alpha}},
\qquad
\hat{\boldsymbol{\varepsilon}}
\perp
\hat{\boldsymbol{\beta}},
\qquad
\hat{\boldsymbol{\varepsilon}}
\perp
\widehat{\boldsymbol{\alpha\beta}}.
$$

This argument is only a geometric intuition for now. A formal proof will be given in the next chapter, where we discuss general linear models.

Now, it turns out that $\hat{\boldsymbol{\mu}}$, $\hat{\boldsymbol{\alpha}}$, $\hat{\boldsymbol{\beta}}$, and $\widehat{\boldsymbol{\alpha\beta}}$ are also orthogonal to each other.

This is due to the *balanced* factorial structure of the design and the way we defined the effects. We will have more details on what this means, and what to do when a design is not balanced in the next chapter. 

| Orthogonality | Reason |
|---|---|
| $\hat{\boldsymbol{\mu}}\perp\hat{\boldsymbol{\alpha}}$ | $\sum_i\hat{\alpha}_i=0$ |
| $\hat{\boldsymbol{\mu}}\perp\hat{\boldsymbol{\beta}}$ | $\sum_j\hat{\beta}_j=0$ |
| $\hat{\boldsymbol{\mu}}\perp\widehat{\boldsymbol{\alpha\beta}}$ | interaction terms sum to zero across rows and columns |
| $\hat{\boldsymbol{\alpha}}\perp\hat{\boldsymbol{\beta}}$ | balanced replication separates feedback and difficulty directions |
| $\hat{\boldsymbol{\alpha}}\perp\widehat{\boldsymbol{\alpha\beta}}$ | $\sum_j\widehat{(\alpha\beta)}_{i,j}=0$ for each $i$ |
| $\hat{\boldsymbol{\beta}}\perp\widehat{\boldsymbol{\alpha\beta}}$ | $\sum_i\widehat{(\alpha\beta)}_{i,j}=0$ for each $j$ |
| $\hat{\boldsymbol{\varepsilon}}\perp$ all fitted components | least-squares residual orthogonality |

### Fitted Vectors' Magnitudes

We have already chosen squared error as the scale on which model fit is measured in the least-squares problem. In vector notation, this means that least squares measures deviation by squared $L^2$ norm:

$$
\|\mathbf{y}-\mathbf{m}\|^2.
$$

Now we want to describe the fitted decomposition produced by least squares:

$$
\mathbf{y}-\hat{\boldsymbol{\mu}}
=
\hat{\boldsymbol{\alpha}}
+
\hat{\boldsymbol{\beta}}
+
\widehat{\boldsymbol{\alpha\beta}}
+
\hat{\boldsymbol{\varepsilon}}.
$$

The question is: how large is each component in this decomposition?

To keep the measurement scale consistent with least squares, we measure each component using the same $L^2$ geometry. 

For a vector $\mathbf{v}\in\mathbb{R}^N$,

$$
\|\mathbf{v}\|^2
=
\sum_{n=1}^N v_n^2.
$$

In our indexed notation, this is

$$
\|\mathbf{v}\|^2
=
\sum_{i,j,k} v_{n(i,j,k)}^2.
$$

This choice has an important advantage. Squared $L^2$ norm works cleanly with orthogonality. If two vectors are orthogonal, then

$$
\mathbf{u}\perp\mathbf{v}
\implies
\|\mathbf{u}+\mathbf{v}\|^2
=
\|\mathbf{u}\|^2+\|\mathbf{v}\|^2.
$$

Similarly, for $q$ mutually orthogonal vectors,

$$
\left\|\sum_{\ell=1}^q \mathbf{v}_\ell \right\|^2
=
\sum_{\ell=1}^q \|\mathbf{v}_\ell\|^2.
$$

Thus, the same $L^2$ geometry that defined least-squares fitting also allows the fitted decomposition to become an additive decomposition of squared lengths.

Applying this to our decomposition,

$$
\begin{align*}
\|\mathbf{y}-\hat{\boldsymbol{\mu}}\|^2&=\|\hat{\boldsymbol{\alpha}}+\hat{\boldsymbol{\beta}}+\widehat{\boldsymbol{\alpha\beta}}+\hat{\boldsymbol{\varepsilon}}\|^2  \\
&=\|\hat{\boldsymbol{\alpha}}\|^2+\|\hat{\boldsymbol{\beta}}\|^2+\|\widehat{\boldsymbol{\alpha\beta}}\|^2+\|\hat{\boldsymbol{\varepsilon}}\|^2.
\end{align*}
$$

Similarly, writing this out component by component gives:

$$
\begin{align*}
\sum_{i,j,k}(y_{i,j,k} - \hat\mu)^2
&= \sum_{i,j,k}(\bar{y}_{i,.,.} - \hat\mu)^2 + \sum_{i,j,k} (\bar{y}_{.,j,.} - \hat\mu)^2 \\ &+  \sum_{i,j,k} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)^2 + \sum_{i,j,k} (y_{i,j,k} - \bar{y}_{i,j,.})^2.
\end{align*}
$$

??? info "The expansion on the right-hand side"

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
\mathrm{SS_T} = \|\mathbf{y}-\hat{\boldsymbol{\mu}}\|^2 = \sum_{i,j,k}(y_{i,j,k}-\hat\mu)^2 \\
\mathrm{SS_A} = \|\hat{\boldsymbol{\alpha}}\|^2 = \sum_{i,j,k}(\bar{y}_{i,.,.} - \hat\mu)^2 \\
\mathrm{SS_B} = \|\hat{\boldsymbol{\beta}}\|^2 = \sum_{i,j,k} (\bar{y}_{.,j,.} - \hat\mu)^2 \\
\mathrm{SS_{A\times B}} = \|\widehat{\boldsymbol{\alpha\beta}}\|^2 = \sum_{i,j,k} (\bar{y}_{i,j,.} - \bar{y}_{i,.,.} - \bar{y}_{.,j,.} + \hat\mu)^2 \\
\mathrm{SS_E} = \|\hat{\boldsymbol{\varepsilon}}\|^2 = \sum_{i,j,k} (y_{i,j,k} - \bar{y}_{i,j,.})^2 
\end{gather*}
$$

We now obtain the classical SS formula for this experiment:

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

We started with 60 observed scores and asked how they could be represented by a structured model rather than merely reproduced as a table.

The first move was to write an observation as

$$
\text{observation}
=
\text{systematic structure}
+
\text{residual}.
$$

For this experiment, the systematic structure came from the two-factor design. The full two-way model was

$$
Y_{i,j,k}
=
\mu
+
\alpha_i
+
\beta_j
+
(\alpha\beta)_{i,j}
+
\varepsilon_{i,j,k}.
$$

This model says that each score is represented by an overall level, a feedback component, a difficulty component, a feedback-by-difficulty interaction component, and a leftover.

Because the parameters in this model are not directly observable, we estimated them by least squares. Using squared error as the loss function, the fitted components were

$$
\begin{gather*}
\hat{\mu}
=
\bar{y}_{.,.,.},
\\
\hat{\alpha}_i
=
\bar{y}_{i,.,.}
-
\bar{y}_{.,.,.},
\\
\hat{\beta}_j
=
\bar{y}_{.,j,.}
-
\bar{y}_{.,.,.},
\\
\widehat{(\alpha\beta)}_{i,j}
=
\bar{y}_{i,j,.}
-
\bar{y}_{i,.,.}
-
\bar{y}_{.,j,.}
+
\bar{y}_{.,.,.},
\\
\hat{\varepsilon}_{i,j,k}
=
y_{i,j,k}
-
\bar{y}_{i,j,.}.
\end{gather*}
$$

Therefore, each centered observation can be decomposed as

$$
y_{i,j,k}
-
\hat{\mu}
=
\hat{\alpha}_i
+
\hat{\beta}_j
+
\widehat{(\alpha\beta)}_{i,j}
+
\hat{\varepsilon}_{i,j,k}.
$$

We then rewrote this scalar decomposition in vector form:

$$
\mathbf{y}
-
\hat{\boldsymbol{\mu}}
=
\hat{\boldsymbol{\alpha}}
+
\hat{\boldsymbol{\beta}}
+
\widehat{\boldsymbol{\alpha\beta}}
+
\hat{\boldsymbol{\varepsilon}}.
$$

In vector notation, the full model corresponds to a fitted-value space $\mathcal{S}_F$, and least squares chooses the fitted vector in this space closest to the observed data vector $\mathbf{y}$.

This geometric view explains why sums of squares appear naturally. Least squares measures model failure by squared $L^2$ distance, and the balanced factorial design makes the fitted component vectors orthogonal to each other. Orthogonality then allows squared lengths to add:

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

In this balanced two-way design, the total squared deviation from the grand mean can be partitioned into feedback, difficulty, interaction, and residual sums of squares.

What we cannot say yet is whether any one of these pieces is large enough to be statistically meaningful. For that, we need to know how these sums of squares behave under sampling.

In the next section, we will introduce degrees of freedom, mean squares, and the $F$ statistic.

[^fisher1926]: R. A. Fisher, “The Arrangement of Field Experiments,” *Journal of the Ministry of Agriculture* 33 (1926): 511.