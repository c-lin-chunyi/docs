# When Is a Sum of Squares Statistically Significant?

## Section Recap

Previously, we want to know what likely causes each participant's score to be different from the grand mean.

We proposed four likely possible sources of variation, namely:

1. From the feedback type they received
2. From the task difficulty they received
3. From the interaction of feedback type and task difficulty.
4. Or just from random variations between participants.

We then decomposed an individual participant $(i,j,k)$'s task performance into four parts:

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

Then we propagated this decomposition to the whole observation using sum of squares.

$$
\|\mathbf{y}−\widehat{\boldsymbol{\mu}}\|^2
=\|\widehat{\boldsymbol{\alpha}}\|^2+\|\widehat{\boldsymbol{\beta}}\|^2+\|\widehat{\boldsymbol{\alpha\beta}}\|^2+\|\widehat{\boldsymbol{\varepsilon}}\|^2.
$$

Let

$$
\begin{gather*}
\mathrm{SS_T} = \|\mathbf{y}−\widehat{\boldsymbol{\mu}}\|^2 \\
\mathrm{SS_A} = \|\widehat{\boldsymbol{\alpha}}\|^2 \\
\mathrm{SS_B} = \|\widehat{\boldsymbol{\beta}}\|^2 \\
\mathrm{SS_{A\times B}} = \|\widehat{\boldsymbol{\alpha\beta}}\|^2  \\
\mathrm{SS_E} = \|\widehat{\boldsymbol{\varepsilon}}\|^2,
\end{gather*}
$$

we obtained the classical SS formula:

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

Still, decomposition alone seems unable to address our original question.

It is then heuristic to directly compare the value of $\mathrm{SS_A}$, $\mathrm{SS_B}$ or $\mathrm{SS_{A\times B}}$ to $\mathrm{SS_E}$, either by subtraction or division.

However, subtraction or division alone actually tells us very little.

For example, suppose we compute

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
$$

and a number comes out. But, what does it mean?

Is it large? Is it small? Judged by what *standard*?

If the number equals 1 or nearly equals 1, does it mean that the interaction effect is absent, and if the number is larger than 1, does it mean it is not null?

Then what does it mean when the number is less than 1, and what even counts as "nearly equals 1"?

Therefore, we need a principled way to define a standard which our comparison should be judged.

## Comparing Different Models

Before that, let's take a look at what ${\mathrm{SS_{A\times B}}}$ means:

From a vectorized perspective, $\mathrm{SS_{A\times B}}$ measures how much of the centered observation vector is captured by it.

Our previous attempt of directly comparing $\mathrm{SS_{A\times B}}$ with $\mathrm{SS_E}$, i.e. by comparing the magnitude of $\widehat{\boldsymbol{\alpha\beta}}$ with $\widehat{\boldsymbol{\varepsilon}}$ seems futile, and we have to approach the same concern differently. This time let's look at our proposed model again.

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

If we suspect that the interaction is absent, then why include the interaction component in the model in the first place? Allowing the model to capture an absent effect may only let it chase random fluctuations (i.e, overfitting the data).

Let's see what happens if we drop the interaction term and push it to the residual error. 

We call our originally proposed model as "full model" denoted by $\mathcal{M}_{F}$, and our new model with the interaction term removed a "reduced model", denoted by $\mathcal{M}_{R, \mathrm{A\times B}}$:

$$
\mathcal{M}_{R, \mathrm{A\times B}}:
y_{i,j,k}-\hat\mu
=
\widehat{\alpha_i}
+
\widehat{\beta_j}
+
\widehat{\varepsilon_{i,j,k}^{\mathcal{M}_{R, \mathrm{A\times B}}}},
$$

where 

$$
\widehat{\varepsilon_{i,j,k}^{\mathcal{M}_{R, \mathrm{A\times B}}}}, = \widehat{\varepsilon_{i,j,k}} + \widehat{(\alpha\beta)_{i,j}}
$$

Now we vectorize the model using the whole dataset, and taking squared Euclidean norms on both sides:

$$
\|\mathbf{y}−\widehat{\boldsymbol{\mu}}\|^2=\|\widehat{\boldsymbol{\alpha}}+\widehat{\boldsymbol{\beta}}+\widehat{\boldsymbol{\varepsilon}^{\mathcal{M}_{R, \mathrm{A\times B}}}}\|^2 \ \\
$$

where 

$$
\widehat{\boldsymbol{\varepsilon}^{\mathcal{M}_{R, \mathrm{A\times B}}}} = \widehat{\boldsymbol{{\varepsilon}}} + \widehat{\boldsymbol{\alpha\beta}}.
$$ 

Hence

$$
\langle\widehat{\boldsymbol{\varepsilon}^{\mathcal{M}_{R, \mathrm{A\times B}}}}, \widehat{\boldsymbol{\alpha}} \rangle = \langle\widehat{\boldsymbol{{\varepsilon}}}+\widehat{\boldsymbol{\alpha\beta}}, \widehat{\boldsymbol{\alpha}} \rangle = \langle \widehat{\boldsymbol{{\varepsilon}}},\widehat{\boldsymbol{\alpha}} \rangle + \langle \widehat{\boldsymbol{\alpha\beta}},\widehat{\boldsymbol{\alpha}}\rangle = 0,
$$

and

$$
\langle\widehat{\boldsymbol{\varepsilon}^{\mathcal{M}_{R, \mathrm{A\times B}}}}, \widehat{\boldsymbol{\beta}} \rangle = 0,
$$

which gives

$$
\begin{align*}
\|\mathbf{y}−\widehat{\boldsymbol{\mu}}\|^2&=\|\widehat{\boldsymbol{\alpha}}+\widehat{\boldsymbol{\beta}}+\widehat{\boldsymbol{\varepsilon}^{\mathcal{M}_{R, \mathrm{A\times B}}}}\|^2 \ \\
&= \|\widehat{\boldsymbol{\alpha}}\|^2+\|\widehat{\boldsymbol{\beta}}\|^2+\|\widehat{\boldsymbol{\varepsilon}^{\mathcal{M}_{R, \mathrm{A\times B}}}}\|^2 + 2\langle\widehat{\boldsymbol{\alpha}},\widehat{\boldsymbol{\beta}}\rangle + 2\langle\widehat{\boldsymbol{\alpha}},\widehat{\boldsymbol{\varepsilon}^{\mathcal{M}_{R, \mathrm{A\times B}}}}\rangle +2\langle\widehat{\boldsymbol{\beta}},\widehat{\boldsymbol{\varepsilon}^{\mathcal{M}_{R, \mathrm{A\times B}}}}\rangle \\ 
&=\|\widehat{\boldsymbol{\alpha}}\|^2+\|\widehat{\boldsymbol{\beta}}\|^2+\|\widehat{\boldsymbol{\varepsilon}^{\mathcal{M}_{R, \mathrm{A\times B}}}}\|^2.
\end{align*}
$$

Since

$$
\widehat{\boldsymbol{\varepsilon}}
\perp
\widehat{\boldsymbol{\alpha\beta}},
$$

we also have

$$
\begin{aligned}
\|\widehat{\boldsymbol{\varepsilon}^{\mathcal{M}_{R, \mathrm{A\times B}}}}\|^2
&=
\|
\widehat{\boldsymbol{\varepsilon}}
+
\widehat{\boldsymbol{\alpha\beta}}
\|^2 \\
&=
\|
\widehat{\boldsymbol{\varepsilon}}
\|^2
+
\|
\widehat{\boldsymbol{\alpha\beta}}
\|^2 \\
&=
\mathrm{SS_E}
+
\mathrm{SS_{A\times B}}.
\end{aligned}
$$

Since different models leave different things unexplained in their residual terms, we now introduce a general notation for the residual sum of squares of a model: $\mathrm{SSE}$, or sum of squared errors,

where 

$$
\mathrm{SSE}_{\mathcal{M}_{F}}=\|\widehat{\boldsymbol{\varepsilon}}
\|^2=\mathrm{SS_E},
$$

and

$$
\mathrm{SSE}_{\mathcal{M}_{R, \mathrm{A\times B}}}=\|\widehat{\boldsymbol{\varepsilon}^{\mathcal{M}_{R, \mathrm{A\times B}}}}\|^2 =\mathrm{SS_E}
+
\mathrm{SS_{A\times B}}.
$$

Therefore, $\mathrm{SS_{A\times B}}$ can be viewed as the reduction in SSE by allowing the interaction component into the model.

From this point of view, instead of merely asking whether

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
$$

looks small or large from an arbitrary standard, we can ask a different question:

Does the full model fit our data reasonably better than one of the reduced models? 

One principled way of answering this question comes from likelihood. Each model assigns a probability density to the observed data. A model that gives higher likelihood to the observed data can be said to fit the data better in the likelihood sense.

## Likelihood Ratio Testing and Calibration
### Normality Assumption
Up to this point, our decomposition operations were purely geometric.

But from this point on, we make an additional assumption:

$$
\varepsilon_{i,j,k}\overset{\mathrm{i.i.d}}{\sim}\mathcal{N}(0,\sigma^2).
$$

I.e., the residual errors are assumed to be independent, normally distributed, centered at zero, and to have the same variance in every condition.

!!! warning "Distributional assumption"

    If this assumption is seriously violated, many classical normal-theory tools including the one we are going to derive in this section may no longer be appropriate.

    In that case, one should consider alternative approches such as bootstrap procedures, data transformations, generalized linear models and more.

### Maximum Likelihood Estimation
Consider a generic model $\mathcal M$ for our example experiment.

We write its fitted value for observation $y_{i,j,k}$ as

$$
\widehat y^{(\mathcal M)}_{i,j,k}.
$$

Under the normal-error assumption,

$$
y_{i,j,k}
=
\widehat y^{(\mathcal M)}_{i,j,k}
+
\varepsilon_{i,j,k},
\qquad
\varepsilon_{i,j,k}\overset{\mathrm{i.i.d}}{\sim}\mathcal{N}(0,\sigma^2).
$$

Therefore,

$$
y_{i,j,k}\mid \mathcal M,\sigma^2
\sim
\mathcal{N}\left(
\widehat y^{(\mathcal M)}_{i,j,k},
\sigma^2
\right).
$$

Hence, the likelihood of the whole dataset is:

$$
L(\mathcal M,\sigma^2)
=
\prod_{i,j,k}
\frac{1}{\sqrt{2\pi\sigma^2}}
\exp\left[
-
\frac{
\left(
y_{i,j,k}
-
\widehat y^{(\mathcal M)}_{i,j,k}
\right)^2
}{
2\sigma^2
}
\right].
$$

Taking logs on both sides:

$$
\begin{aligned}
\ell(\mathcal M,\sigma^2)
&=
\sum_{i,j,k}
\left[
-\frac{1}{2}\ln(2\pi\sigma^2)
-
\frac{
\left(
y_{i,j,k}
-
\widehat y^{(\mathcal M)}_{i,j,k}
\right)^2
}{
2\sigma^2
}
\right] \\
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
\widehat y^{(\mathcal M)}_{i,j,k}
\right)^2.
\end{aligned}
$$

Note that 

$$
\mathrm{SSE}_{\mathcal M}
=\|\widehat{\boldsymbol{\varepsilon}^{\mathcal{M}}}
\|^2=
\sum_{i,j,k}
\left(
y_{i,j,k}
-
\widehat y^{(\mathcal M)}_{i,j,k}
\right)^2,
$$

hence we have

$$
\ell(\mathcal M,\sigma^2)
=
-\frac{N}{2}\ln(2\pi)
-
\frac{N}{2}\ln(\sigma^2)
-
\frac{\mathrm{SSE}_{\mathcal M}}{2\sigma^2}.
$$

We want to find the specific combination of $\mathcal{M}$ and $\sigma^2$ that gives the maximum likelihood. However, we are currently not interested in studying $\sigma^2$ itself. 

In this case, $\sigma^2$ is called a nuisance parameter, and people often use a method called *profile likelihood* to deal with it.

The idea is simple, we fix our model of choice $\mathcal{M}$, and choose a $\sigma^2$ that makes the likelihood as large as possible,

i.e. to find

$$
\widehat{\sigma^2}_{\mathcal M,\mathrm{MLE}}
=\operatorname*{arg\,max}_{\sigma^2}\ell(\mathcal M,\sigma^2).
$$

For a fixed model $\mathcal M$, differentiate the log-likelihood with respect to $\sigma^2$:

$$
\frac{\partial \ell(\mathcal M,\sigma^2)}{\partial \sigma^2}
=
-\frac{N}{2\sigma^2}
+
\frac{\mathrm{SSE}_{\mathcal M}}{2(\sigma^2)^2}.
$$

Setting the derivative equal to zero,

$$
-\frac{N}{2\sigma^2}
+
\frac{\mathrm{SSE}_{\mathcal M}}{2(\sigma^2)^2}
=
0.
$$

Multiplying both sides by $2(\sigma^2)^2$,

$$
-N\sigma^2+\mathrm{SSE}_{\mathcal M}=0.
$$

Therefore, the maximum-likelihood estimate of $\sigma^2$ under model $\mathcal M$ is

$$
\widehat{\sigma^2}_{\mathcal M,\mathrm{MLE}}
=
\operatorname*{arg\,max}_{\sigma^2}\ell(\mathcal M,\sigma^2)
=
\frac{\mathrm{SSE}_{\mathcal M}}{N}.
$$

Substituting $\widehat{\sigma^2}_{\mathcal M,\mathrm{MLE}}$ back into the log-likelihood gives us the profile log-likelihood of model $\mathcal{M}$:

$$
\begin{align*}
\ell_p(\mathcal M)
&=
\ell\left(
\mathcal M,
\widehat{\sigma^2}_{\mathcal M,\mathrm{MLE}}
\right)\\
&=
-\frac{N}{2}\ln(2\pi)
-
\frac{N}{2}
\ln\left(
\frac{\mathrm{SSE}_{\mathcal M}}{N}
\right)
-
\frac{\mathrm{SSE}_{\mathcal M}}
{2(\mathrm{SSE}_{\mathcal M}/N)} \\
&=
-\frac{N}{2}\ln(2\pi)
-
\frac{N}{2}
\ln\left(
\frac{\mathrm{SSE}_{\mathcal M}}{N}
\right)
-
\frac{N}{2}.
\end{align*}
$$

and thus the profile likelihood is

$$
\begin{align*}
L_p(\mathcal M)
&=\exp\left[-\frac{N}{2}\ln(2\pi) - \frac{N}{2}\ln\left(\frac{\mathrm{SSE}_{\mathcal M}}{N}\right) - \frac{N}{2}\right] \\
&=\exp\left[-\frac{N}{2} \ln\left( \frac{2\pi e \cdot \mathrm{SSE}_{\mathcal M}}{N} \right) \right] \\
&= \left( \frac{2\pi e \cdot \mathrm{SSE}_{\mathcal M}}{N} \right)^{-\frac{N}{2}} \\
&= (2\pi e)^{-\frac{N}{2}} \left( \frac{\mathrm{SSE}_{\mathcal M}}{N} \right)^{-\frac{N}{2}}.
\end{align*}
$$

Unfortunately, a single likelihood value by itself is still hard to interpret.

Likelihood is best interpreted comparatively. It becomes useful when we compare two likelihood values.

### What Are We Even Doing?

Before we proceed further, I think we need to take a moment to reflect on what we have done.

We want to know what likely causes each participant's score to be different from the grand mean, and have successfully decomposed one individual observation into multiple mutually orthogonal sources. 

Then we have vectorized one single observation to the whole dataset, and used squared Euclidean norms to facilitate the orthogonality, landing ourselves with an SS decomposition formula, which tells us about how much does each of the likely sources contribute to the deviation of scores from the grand mean.

But decomposition by itself is still not enough, we want to know whether one likely source (here being A $\times$ B) is just reflecting residual errors.

Intuitively, we turned to $\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}$, which is reasonable, but the ratio had no standard of interpretation.

Then after some pondering, we reframed the problem as a model comparison problem and introduced $\mathrm{SSE}_{\mathcal M}$.

And now under the normal-error assumption, we have the profile likelihood $L_p(\mathcal M)$. 

One might feel that we are just replacing one number with another arbitrarily.

But in statistics, replacing one number with another is never arbitrary when the two numbers are trying to answer different kinds of question. 

The sum-of-squares decomposition is a *descriptive statistic*. It summarizes what is present in the data we happen to have. 

A descriptive statistic therefore cannot be right or wrong, because it merely rearranges our data. It does not make any claim, nor any prediction about this world. This is why our attempt to use $\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}$ or SSE to tell whether our decomposed A $\times$ B term is just a conflation of residual errors fails. A description cannot tell us something beyond what is already available to us.

Our normality assumption for residual errors however, is a different kind of object. It is a probability-theoretic claim about the data generating processes. With that, we are asking how things would play out in many probable worlds. However, a probability-theoretic claim not anchored in this world we are living in also cannot tell us what is right or wrong.

Inferential statistics is, in a sense, an attempt to rule out many probable worlds using data from this world, by using descriptive statistics and probability-theoretic tools together. 

A descriptive quantity cannot be right or wrong, and for our problem it is not that informative either because it has nothing to be checked against. 

A generative model, say a random variable $X \sim \mathcal{N}(0,1)$, is also not that informative, because although it can be right or wrong, it has nothing to do with this world we live in.

But a claim about how our data is generated is different. It is anchored by the data we have observed, it can predict what kind of data is probable, and the claim itself can be embarrassed by our observations. 

Therefore, by passing from $\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}$ to $L_p(\mathcal{M})$ we are not solely using increasingly complex tools for the sake of complexity. It is what will allow us, in the next section, to construct a *probabilistic standard* for our earlier ratio. 

### Likelihood Ratio Testing

Now, we want to compare the reduced and full models by comparing their profile likelihoods:

$$
\begin{align*}
\Lambda_{A\times B}
&=
\frac{
L_p(\mathcal M_{R,A\times B})
}{
L_p(\mathcal M_F)
}\\
&=\frac{(2\pi e)^{-\frac{N}{2}} \left( \frac{\mathrm{SSE}_{\mathcal{M}_{R,A\times B}}}{N} \right)^{-\frac{N}{2}}}{(2\pi e)^{-\frac{N}{2}} \left( \frac{\mathrm{SSE}_{\mathcal M_F}}{N} \right)^{-\frac{N}{2}}}\\
&= \left(\frac{
\mathrm{SSE}_{\mathcal{M}_{R,A\times B}}
}{
\mathrm{SSE}_{\mathcal{M}_F}
}\right)^{-\frac{N}{2}}
.
\end{align*}
$$

If the reduced model fits almost as well as the full model, then

$$
L_p(\mathcal M_{R,A\times B})
\approx
L_p(\mathcal M_F),
$$

so

$$
\Lambda_{A\times B}\approx 1,
$$

which means removing the interaction component causes little loss of likelihood.

But if the reduced model fits much worse than the full model, then

$$
L_p(\mathcal M_{R,A\times B})
\ll
L_p(\mathcal M_F),
$$

and

$$
\Lambda_{A\times B}\ll 1,
$$

which means removing the interaction component causes a large loss of likelihood. 

Therefore, stronger evidence against the reduced model corresponds to a smaller likelihood ratio.

Taking logs on $\Lambda_{A\times B}$:

$$
\ln \Lambda_{A\times B}
=
-\frac{N}{2}
\ln\left(
\frac{
\mathrm{SSE}_{\mathcal M_{R,A\times B}}
}{
\mathrm{SSE}_{\mathcal M_F}
}
\right).
$$

Therefore,

$$
-2\ln \Lambda_{A\times B}
=
N
\ln\left(
\frac{
\mathrm{SSE}_{\mathcal M_{R,A\times B}}
}{
\mathrm{SSE}_{\mathcal M_F}
}
\right).
$$

Since the sign on both sides have been flipped, now stronger evidence against the reduced model corresponds to a larger $-2\ln \Lambda_{A\times B}$.


Recall that 

$$
\mathrm{SSE}_{\mathcal{M}_{F}}=\|\widehat{\boldsymbol{\varepsilon}}
\|^2=\mathrm{SS_E},
$$

and

$$
\mathrm{SSE}_{\mathcal{M}_{R, \mathrm{A\times B}}}=\|\widehat{\boldsymbol{\varepsilon}^{\mathcal{M}_{R, \mathrm{A\times B}}}}\|^2 =\mathrm{SS_E}
+
\mathrm{SS_{A\times B}}.
$$

Thus,

$$
\frac{
\mathrm{SSE}_{\mathcal M_{R,A\times B}}
}{
\mathrm{SSE}_{\mathcal M_F}
}=
1+\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
\geq 1.
$$

The ratio inside the logarithm is at least $1$. The farther this ratio is above $1$, the more residual error is added by removing the interaction component, and the larger our $-2\ln \Lambda_{A\times B}$ statistic becomes, suggesting stronger evidence against the reduced model.

Thus,

$$
-2\ln\Lambda_{A\times B}
=
N\ln\left(
1+
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
\right).
$$

Because $N>0$, and $\ln(1+x)$ is strictly increasing for $x\geq 0$, the likelihood-ratio statistic is a strictly increasing function of

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}.
$$

Therefore, the raw ratio

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
$$

is monotone-equivalent to the likelihood-ratio evidence for our reduced-versus-full comparison.

As it turns out, our original ratio was not outright wrong. It was pointing toward the right comparison.

However, $\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}$ cannot be called a calibrated test statistic yet. It tells us the direction and ordering of evidence, but not the reference standard for deciding how large is large enough. 

It seems that we have circled back to the beginning, and what to do now?

### Degrees of Freedom

By using likelihood, we have known which comparison matters and why. But yet we need to *calibrate* that comparison.

Before that, we first go back to the geometry of our decomposition.

$$
\mathbf{y}−\widehat{\boldsymbol{\mu}}=\widehat{\boldsymbol{\alpha}}+\widehat{\boldsymbol{\beta}}+\widehat{\boldsymbol{\alpha\beta}}+\widehat{\boldsymbol{\varepsilon}}.
$$

Here, each component vector is allowed to move inside a certain subspace $W$. We call the dimension of that subspace, $\dim W$, its degrees of freedom.

Recall the sum-to-zero constraints we imposed on the model:

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

These constraints actually tell us how many values each component is free to vary over. This number is its degrees of freedom.

Take the interaction component as an example.

The interaction term contains one value for each feedback-by-difficulty cell:

$$
(\alpha\beta)_{i,j},
\qquad
i=1,\ldots,I,
\qquad
j=1,\ldots,J.
$$

At first, this looks like $IJ$ numbers. But they are not all free, because the interaction component must satisfy both row-sum and column-sum constraints:

$$
\sum_i(\alpha\beta)_{i,j}=0
\quad\text{for every }j,
$$

and

$$
\sum_j(\alpha\beta)_{i,j}=0
\quad\text{for every }i.
$$

A simple way to count the free values is to fill in the interaction table.

First choose the values in the upper-left $(I-1)\times(J-1)$ block freely:

$$
(\alpha\beta)_{i,j},
\qquad
i=1,\ldots,I-1,
\qquad
j=1,\ldots,J-1.
$$

There are

$$
(I-1)(J-1)
$$

such values.

Once these values are chosen, the remaining values are forced by the sum-to-zero constraints.

For each row $i=1,\ldots,I-1$, the final column value must make the row sum zero:

$$
(\alpha\beta)_{i,J}
=
-\sum_{j=1}^{J-1}(\alpha\beta)_{i,j}.
$$

For each column $j=1,\ldots,J-1$, the final row value must make the column sum zero:

$$
(\alpha\beta)_{I,j}
=
-\sum_{i=1}^{I-1}(\alpha\beta)_{i,j}.
$$

Finally, the bottom-right value is also forced. It must satisfy the last row sum and the last column sum:

$$
(\alpha\beta)_{I,J}
=
-\sum_{j=1}^{J-1}(\alpha\beta)_{I,j}
=
-\sum_{i=1}^{I-1}(\alpha\beta)_{i,J}.
$$

Therefore, the interaction component has only

$$
df_{\mathrm{A\times B}}
=
(I-1)(J-1)
$$

free values.

Similarly, for the feedback component $A$, there are $I$ feedback-level deviations:

$$
\alpha_1,\alpha_2,\ldots,\alpha_I.
$$

But they must satisfy

$$
\sum_i \alpha_i=0.
$$

So once $I-1$ values are chosen, the last one is determined. Therefore,

$$
df_\mathrm{A}=I-1.
$$

The same logic applies to the difficulty component $B$. Since there are $J$ difficulty-level deviations and one sum-to-zero constraint,
$$
df_\mathrm{B}=J-1.
$$

For the residual component $E$, the residuals vary within each cell. In cell $(i,j)$, there are $K$ residuals:

$$
\varepsilon_{i,j,1},\varepsilon_{i,j,2},\ldots,\varepsilon_{i,j,K}.
$$

In the full model, the fitted value for observation $k$ in cell $(i,j)$ is

$$
\widehat y_{i,j,k}
=
\hat\mu
+
\widehat{\alpha_i}
+
\widehat{\beta_j}
+
\widehat{(\alpha\beta)}_{i,j}.
$$

Recall the definitions:

$$
\widehat{\alpha_i}
=
\bar y_{i,.,.}-\hat\mu,
$$

$$
\widehat{\beta_j}
=
\bar y_{.,j,.}-\hat\mu,
$$

and

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

Substituting these into the fitted value gives

$$
\begin{aligned}
\widehat y_{i,j,k}
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

So in the full model, every observation in cell $(i,j)$ receives the same fitted value:
$$
\widehat y_{i,j,k}
=
\bar y_{i,j,.}.
$$

Therefore, the residual for observation $k$ in cell $(i,j)$ is

$$
\widehat{\varepsilon}_{i,j,k}
=
y_{i,j,k}
-
\bar y_{i,j,.}.
$$

Now sum these residuals within the same cell:

$$
\begin{aligned}
\sum_k \widehat{\varepsilon}_{i,j,k}
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

But by definition,

$$
\bar y_{i,j,.}
=
\frac{1}{K}
\sum_k y_{i,j,k}.
$$

So

$$
K\bar y_{i,j,.}
=
\sum_k y_{i,j,k}.
$$

Therefore,

$$
\sum_k \widehat{\varepsilon}_{i,j,k}
=
0.
$$

Thus, within each cell, the $K$ residuals are not all free. Once $K-1$ residuals are known, the last one is forced to make the cell residual sum equal to zero.

Therefore, each cell contributes $K-1$ residual degrees of freedom. Since there are $IJ$ cells,

$$
df_{\mathrm{E}}=IJ(K-1).
$$

Finally, for the total centered data vector,

$$
\mathbf y-\widehat{\boldsymbol\mu},
$$

there are $N=IJK$ observations, but centering by the grand mean imposes one constraint:

$$
\sum_{i,j,k}(y_{i,j,k}-\hat\mu)=0.
$$

Thus,

$$
df_T=N-1=IJK-1.
$$

In this chapter, degrees of freedom mean the number of independent directions in which a component can vary after the model constraints have been imposed.

In the later chapters when we discuss the geometry of linear models, we will describe the same idea using projection subspaces and their dimensions.

### Calibration

We now know two things. First, our likelihood-ratio derivation showed that our original ratio

$$
\frac{\mathrm{SS_{A\times B}}}{\mathrm{SS_E}}
$$

points in the right direction. Larger values correspond to larger likelihood-ratio evidence against the reduced model.

Second, our degrees-of-freedom derivation showed that the numerator and denominator come from spaces with different dimensions:

$$
df_{\mathrm{A\times B}}=(I-1)(J-1),
\qquad
df_{\mathrm{E}}=IJ(K-1).
$$

So the raw ratio is still not the final object. A component with more degrees of freedom is more likely to absorb random fluctuation.

This is where *calibration* enters.

Calibration tries to answer the problem:

> If our reduced model were true, what values of this comparison would be ordinary?

It does so by building a reference standard for interpreting a statistic, i.e., constructing a reference distribution under the reduced model.

In our example, the reduced model says that the true interaction component is absent. Under that model, any fitted interaction component comes only from random residual fluctuation. 

Therefore, calibration asks:

How large can $\mathrm{SS_{A\times B}}$ become just by fitting random fluctuation?

But we should also compare it with the amount of residual fluctuation left in the full model. Therefore, the calibrated comparison should have the form

$$
\frac{
\text{interaction squared length per interaction dimension}
}{
\text{residual squared length per residual dimension}
}.
$$

That is,

$$
\frac{
\mathrm{SS_{A\times B}}/df_{\mathrm{A\times B}}
}{
\mathrm{SS_E}/df_{\mathrm{E}}
}.
$$

The numerator measures how much squared variation the interaction component captures per interaction degree of freedom, and similarly, the denominator measures how much squared variation remains as residual error per residual degree of freedom.

If the reduced model is adequate, then the fitted interaction component is only fitting random error. In that case, the numerator should be comparable to the denominator. If the numerator is much larger than the denominator, the interaction component has captured more variation per dimension than we would expect from residual noise alone.

However, this is still just an intuition yet. 

To turn it into a statistical test, we need the probability distribution of this calibrated ratio under the reduced model.

## Cochran's Theorem

Now we will use a classical result called **Cochran's theorem**. 

We will use only a simplified version of it here. The full theorem is usually stated in terms of quadratic forms and projection matrices. [^cochran1934].

!!! info "Cochran's Theorem, Simplified"

    If a normal error vector is decomposed into mutually orthogonal components, then the squared lengths of these components, after division by $\sigma^2$, follow independent $\chi^2$ distributions.  

    The degrees of freedom of each $\chi^2$ distribution equals the dimension of the corresponding component space.


Under the normal-error model, and under the null hypothesis that the population interaction component is zero,

$$
H_0^{A\times B}:(\alpha\beta)_{ij}=0
\quad\text{for all }i,j,
$$

the fitted interaction component $\widehat{\boldsymbol{\alpha\beta}}$ is a projection of pure error onto the interaction subspace. Cochran's theorem then gives

$$
\frac{\mathrm{SS_{A\times B}}}{\sigma^2}
=
\frac{
\|\widehat{\boldsymbol{\alpha\beta}}\|^2
}{\sigma^2}
\sim
\chi^2_{df_{\mathrm{A\times B}}}.
$$

The residual component is also a projection of the same normal error vector onto the residual subspace, so

$$
\frac{\mathrm{SS_E}}{\sigma^2}
=
\frac{
\|\widehat{\boldsymbol{\varepsilon}}\|^2
}{\sigma^2}
\sim
\chi^2_{df_{\mathrm{E}}}.
$$

Because the interaction subspace and the residual subspace are orthogonal, Cochran's theorem also gives independence between these two $\chi^2$ variables.

Therefore,

$$
\frac{
\left(\mathrm{SS_{A\times B}}/\sigma^2\right)/df_{\mathrm{A\times B}}
}{
\left(\mathrm{SS_E}/\sigma^2\right)/df_{\mathrm{E}}
}
\sim
F_{df_{\mathrm{A\times B}},df_{\mathrm{E}}}.
$$

The unknown $\sigma^2$ cancels, giving

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

### Two-way Analysis of Variance

We can finally name the procedure we have derived.

We began with a balanced two-factor design, decomposed the centered data vector into feedback, difficulty, interaction, and residual components, used likelihood to identify the relevant reduced-versus-full comparison, and then used degrees of freedom plus Cochran's theorem to calibrate the comparison.

This procedure is the classical **two-way analysis of variance**, or **two-way ANOVA**.

In this balanced design, the same logic applies to each fitted component:

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

and

$$
F_\mathrm{{A\times B}}
=
\frac{\mathrm{SS_{A\times B}}/df_{\mathrm{A\times B}}}{\mathrm{SS_E}/df_{\mathrm{E}}}.
$$

Under the corresponding null hypotheses,

$$
H_0^\mathrm{A}:\alpha_i=0\quad\text{for all }i,
$$

$$
H_0^\mathrm{B}:\beta_j=0\quad\text{for all }j,
$$

and

$$
H_0^\mathrm{{A\times B}}:(\alpha\beta)_{i,j}=0\quad\text{for all }i,j,
$$

these statistics follow their corresponding $F$ distributions:

$$
F_\mathrm{A}\sim F_{df_\mathrm{A},df_{\mathrm{E}}},
$$

$$
F_\mathrm{B}\sim F_{df_\mathrm{B},df_{\mathrm{E}}},
$$

and

$$
F_\mathrm{{A\times B}}\sim F_{df_{\mathrm{A\times B}},df_{\mathrm{E}}}.
$$

### The ANOVA Table as Bookkeeping

People often uses a table, called the ANOVA table to organize the quantities we have derived.

| Source | SS | df | MS | F |
|---|---:|---:|---:|---:|
| Feedback $A$ | $\mathrm{SS_A}$ | $I-1$ | $\mathrm{SS_A}/df_\mathrm{A}$ | $\mathrm{MS_A}/\mathrm{MS_E}$ |
| Difficulty $B$ | $\mathrm{SS_B}$ | $J-1$ | $\mathrm{SS_B}/df_\mathrm{B}$ | $\mathrm{MS_B}/\mathrm{MS_E}$ |
| Interaction $A\times B$ | $\mathrm{SS_{A\times B}}$ | $(I-1)(J-1)$ | $\mathrm{SS_{A\times B}}/df_\mathrm{{A\times B}}$ | $\mathrm{MS_{A\times B}}/\mathrm{MS_E}$ |
| Error | $\mathrm{SS_E}$ | $IJ(K-1)$ | $\mathrm{SS_E}/df_\mathrm{E}$ | |
| Total | $\mathrm{SS_T}$ | $IJK-1$ | | |

Here,

$$
\mathrm{MS}
=
\frac{\mathrm{SS}}{df}
$$


means **mean square**, or squared length per degree of freedom.

[^cochran1934]: William G. Cochran, “The Distribution of Quadratic Forms in a Normal System, with Applications to the Analysis of Covariance,” *Mathematical Proceedings of the Cambridge Philosophical Society* 30, no. 2 (1934): 178–191.